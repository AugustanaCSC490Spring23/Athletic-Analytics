import requests 
from bs4 import BeautifulSoup
import csv

url = 'https://www.tfrrs.org/lists/4003/CCIW_Indoor_Performance_List'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

data = []
rows = soup.find_all('tr')
for row in rows:
    cols = row.find_all('td')
    cols = [col.text.strip() for col in cols]
    data.append(cols)

with open('output.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(data)

