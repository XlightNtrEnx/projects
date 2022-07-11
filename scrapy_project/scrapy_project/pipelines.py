# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from scrapy.pipelines.files import FilesPipeline
import hashlib
import os
import mimetypes
from scrapy.utils.python import to_bytes
import re
from scrapy.utils.misc import md5sum
from io import BytesIO
import urllib.parse
from .exporters import JsonLinesItemExporter
from os.path import exists
from os import remove

class ScrapyProjectPipeline:
    def process_item(self, item, spider):
        return item

class FilesPipeline(FilesPipeline):
    
    def file_path(self, request, response=None, info=None, *, item=None):

        # Tries to obtain the extension of the file being downloaded.

        unnecessary_part_at_end_of_url = re.search('\/[^/]+\/[^/]+$', request.url).group(0)
        modified_request_url = request.url.replace(unnecessary_part_at_end_of_url, "")
        media_ext = os.path.splitext(modified_request_url)[1]
        if media_ext not in mimetypes.types_map:
            media_ext = ''
            media_type = mimetypes.guess_type(modified_request_url)[0]
            if media_type:
                media_ext = mimetypes.guess_extension(media_type)

        # Access the item object to figure out the information of the song being downloaded..

        band_name = ItemAdapter(item).get("band_name", "Bandless Song")
        song_category = ItemAdapter(item).get("song_category", "Uncategorised Song")
        song_name = ItemAdapter(item).get("song_name", "Unnamed Song")

        # Access the url to figure out the information of the song being downloaded

        song_type = urllib.parse.unquote(re.search('(.+)([/])(.+)$', os.path.splitext(modified_request_url)[0]).group(3)).replace("_", " ").replace(song_name + " ", "").replace(song_name, "")

        return f'{rew(band_name)}/{rew(song_category)}/{rew(song_name)}/{rew(song_name)}{rew(song_type)}{media_ext}'

    def file_downloaded(self, response, request, info, *, item=None):

        # Stores in Bang Dream Songs

        path = self.file_path(request, response=response, info=info, item=item)
        buf = BytesIO(response.body)
        checksum = md5sum(buf)
        buf.seek(0)
        self.store.persist_file(path, buf, info)

        # Duplicates complete/game version songs into Bang Dream Songs/Google Drive 

        unnecessary_part_at_end_of_url = re.search('\/[^/]+\/[^/]+$', request.url).group(0) # Returns the part of the url after the file extension
        modified_request_url = request.url.replace(unnecessary_part_at_end_of_url, "") # Gives the part of the url that goes until the file extension
        song_name = ItemAdapter(item).get("song_name", "Unnamed Song")
        url_song_name = re.search('(.+)([/])(.+)$', os.path.splitext(modified_request_url)[0]).group(3)
        song_type = urllib.parse.unquote(url_song_name).replace("_", " ").replace(song_name + " ", "").replace(song_name, "") # Instrumental, acoustic, game version, whatever
        if song_type == "" or song_type == "(Game Version)":
            self.store.persist_file("Google Drive/" + path, buf, info) 
        return checksum

class SaveJsonPipeline:

    def process_item(self, item, spider):

        filename = rew(ItemAdapter(item).get("band_name", "Bandless"))
        
        JsonLinesItemExporter(open(filename + ".json", "ab")).export_item(item)

        return item

def rew(string):
    return string.replace("/", "").replace(":", "").replace("*", "").replace("?", "").replace('"', "").replace("<", "").replace(">", "").replace("|", "").replace(".", "")