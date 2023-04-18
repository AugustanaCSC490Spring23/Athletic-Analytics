# -*- coding: utf-8 -*-
"""
Created on Mon Apr  3 18:19:37 2023

@author: jespe
"""

import requests 
from bs4 import BeautifulSoup
import csv

oConferenceList = [4268, 4248, 4237, 4270, 4246, 4301, 4267, 4242, 4245, 4244, 4273,
                    4239, 4241, 4300, 4247, 4272, 4243, 4249, 4250, 4251, 4252, 4254,
                    4238, 4253, 4274, 4258, 4294, 4240, 4255, 4256, 4269, 4257, 4222,
                    4260, 4259, 4261, 4235, 4234, 4265, 4262, 4236, 4263, 4264, 4271,
                    4266]

for i in oConferenceList:
    name = 'output' + str(i) + '.csv'
    urlName = 'https://www.tfrrs.org/lists/' + str(i) + '/'
    url = urlName
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    data = []
    colleges = []
    rows = soup.find_all('tr')
    headers = soup.find_all('thead')
    for head in headers:
        he = head.find_all('th')
        he=[h.text.strip() for h in he]
        he[0]='Rank'
        he[1] = 'Athlete(s)'
        he[4]='Time/Distance'
        break
    data.append(he)
    k=1
    for row in rows:
            cols = row.find_all('td')
            cols = [col.text.strip() for col in cols]
            if cols==[]:
                k=k+1
            if cols!=[]:
            #    j=j+1
                if cols[3] not in colleges:
                    colleges.append(cols[3])
                if cols[1] in colleges or len(cols)==6:
                    temp=cols
                    college=temp[1]
                    temp[1]=temp[3]
                    time=temp[2]
                    temp[2]="NA"
                    temp[3]=college
                    temp.append(temp[5])
                    temp[5]=temp[4]
                    temp[4]=time
                    cols=temp
                elif len(cols)>8 or (k>23):
                    split = cols[4].split('.')
                    if len(split)>1:
                        temp2=cols
                        temp2[5]=temp2[6]
                        temp2[6]=temp2[7]
                        if len(cols)!= 9:
                            temp2[7]=""
                        else:
                            temp2[7]=temp2[8]
                            temp2[8]=""
                        cols=temp2
            data.append(cols)
    with open(name, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(data)