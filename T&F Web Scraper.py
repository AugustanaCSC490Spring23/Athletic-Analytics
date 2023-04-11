# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import requests 
from bs4 import BeautifulSoup
import csv

iConferenceList = [3998,4010, 4003, 4000, 3999, 4002, 4035, 4008, 4009, 4041, 4025,
                     4001, 4027, 4011, 4005, 4012, 4013, 4016, 4014, 4006, 4015, 4017,
                     4026, 3939, 4004, 4018, 3911, 4019, 4020, 4024, 4007, 4021, 4022,
                     4023]

oConferenceList = [4268, 4248, 4237, 4270, 4246, 4301, 4267, 4242, 4245, 4244, 4273,
                    4239, 4241, 4300, 4247, 4272, 4243, 4249, 4250, 4251, 4252, 4254,
                    4238, 4253, 4274, 4258, 4294, 4240, 4255, 4256, 4269, 4257, 4222,
                    4260, 4259, 4261, 4235, 4234, 4265, 4262, 4236, 4263, 4264, 4271,
                    4266]
completeList = iConferenceList + oConferenceList

for i in completeList:

    name = 'output' + str(i) + '.csv'
    urlName = 'https://www.tfrrs.org/lists/' + str(i) + '/?gender=m'
    url = urlName
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    data = []
    events = soup.find_all('h3')
    conference = events[0]
    events = events[1:]
    rows = soup.find_all('tr')
    data.append(conference)
    for event in events:
        k= 0
        data.append(co.text.strip() for co in event)
        for row in rows:
            cols = row.find_all('td')
            cols = [col.text.strip() for col in cols]
            k = k+1
            data.append(cols)
            if k>26:
                break

    with open(name, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(data)