from urllib import response
import scrapy
import bs4
from ..item_loaders import SongLoader
from scrapy.loader import ItemLoader
from ..items import SongItem
import urllib.parse
from os.path import exists
from os import remove

class BangDreamSongsSpider(scrapy.Spider):
    name = "bang_dream_songs"

    def start_requests(self):

        urls = [
            'https://bandori.fandom.com/wiki/Poppin%27Party',
            'https://bandori.fandom.com/wiki/Roselia',
            'https://bandori.fandom.com/wiki/RAISE_A_SUILEN',
            'https://bandori.fandom.com/wiki/Morfonica',
            'https://bandori.fandom.com/wiki/Afterglow',
            'https://bandori.fandom.com/wiki/Pastel*Palettes',
            'https://bandori.fandom.com/wiki/Hello,_Happy_World!',
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):

        # Saves page as html

        filename_friendly_url = rew(response.url).replace(".", "")
        filename = f'{filename_friendly_url}.html'
        with open("Bang Dream Songs/" + filename, 'wb') as f:
            prettified_html_str = bs4.BeautifulSoup(response.body, "html.parser").prettify()
            prettified_html_byte = str.encode(prettified_html_str)
            f.write(prettified_html_byte)

        # Retrieves the band name so each song item produced by parse_song_page can have information about which band made the song

        band_name = urllib.parse.unquote(response.url.replace("https://bandori.fandom.com/wiki/", ""))

        # Uses the band name to check if export file already existed before hand so it can be removed to allow pipeline to export song item to a fresh json file
        
        if exists(band_name + ".json"):
            remove(band_name + ".json")

        with open(band_name + ".json", "a") as f:
            f.write("[")

        # Selects the container with all the songs

        songs = response.css(".tabber.wds-tabber")[0]
        if songs is not None:

            # There are maximum 5 selectors in here with each selector corresponding to each category in categories_possible in an order. 

            categories_available = songs.css(".wds-tab__content") 
            categories_possible = ["Original Songs", "Cover Songs", "Other Songs (Original)", "Other Songs (Cover)", "Extra Songs"]
            index = -1

            # Generates a request for each song in a category

            for category in categories_available:
                index += 1
                song_urls = category.css("a::attr(href)").getall() # The selector retrieves the links for the songs of the same category and puts them into a list
                song_names = category.css("a::text").getall() # The selector retrieves the names of the songs and puts them in a list
                if song_urls is not None:
                    for i, song_url in enumerate(song_urls):
                        yield response.follow(song_url, callback=self.parse_song_page, cb_kwargs={"song_category": categories_possible[index], "song_name": song_names[i], "band_name": band_name})

    def parse_song_page(self, response, band_name, song_category, song_name): 

        # There can be different types of a song (Game version, instrumental, etc). 

        download_links = response.css('audio::attr(src)').getall()

        if download_links is not None:
            yield {
                "file_urls": download_links,
                "band_name" : band_name,
                "song_category": song_category,
                "song_name": song_name,
            }

def rew(string):
    return string.replace("/", "").replace(":", "").replace("*", "").replace("?", "").replace('"', "").replace("<", "").replace(">", "").replace("|", "")