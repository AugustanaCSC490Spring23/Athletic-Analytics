# movie data demo

import pandas as pd
import requests
import re
from bs4 import BeautifulSoup

url = 'http://www.imdb.com/chart/top'
bs = BeautifulSoup(requests.get(url).text, 'html.parser')

movies = bs.select('td.titleColumn')
crew = [a.attrs.get('title') for a in bs.select('td.titleColumn a')]
ratings = [b.attrs.get('data-value') for b in bs.select('td.posterColumn span[name=ir]')]

movieList = []

for index in range(0, len(movies)):

    movie_string = movies[index].get_text()
    movie = (' '.join(movie_string.split()).replace('.', ''))
    movie_title = movie[len(str(index))+1:-7]
    year = re.search('\((.*?)\)', movie_string).group(1)
    place = movie[:len(str(index))-(len(movie))]
    data = {"place": place,
            "movie_title": movie_title,
            "rating": ratings[index],
            "year": year,
            "star_cast": crew[index],
            }
    movieList.append(data)

df = pd.DataFrame(movieList)
df.to_csv('imdb_top_250_movies.csv',index=False)
