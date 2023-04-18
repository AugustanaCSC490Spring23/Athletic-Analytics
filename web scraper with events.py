# -*- coding: utf-8 -*-
"""
Created on Mon Apr  3 18:19:37 2023

@author: jespe
"""

import requests 
from bs4 import BeautifulSoup
import csv


#iConferenceList = [3941, 3933, 3938, 3934, 3940, 3935, 3931, 3932, 3936, 3937, 3998,
#                  4010, 4003, 4000, 3999, 4002, 4035, 4008, 4009, 4041, 4025, 4001,
#                  4027, 4011, 4005, 4012, 4013, 4016, 4014, 4006, 4015, 4017, 4026,
#                  3939, 4004, 4018, 3911, 4019, 4020, 4024, 4007, 4021, 4022, 4023, 
#                  3903]

oConferenceList = [4043, 4268, 4248, 4237, 4270, 4246, 4301, 4267, 4242, 4245, 4244, 4273,
                   4239, 4241, 4300, 4247, 4272, 4243, 4249, 4250, 4251, 4252, 4254,
                   4238, 4253, 4274, 4258, 4294, 4240, 4255, 4256, 4269, 4257, 4222,
                   4260, 4259, 4261, 4235, 4234, 4265, 4262, 4236, 4263, 4264, 4271,
                   4266]
fullData = []
teamList = []

for i in oConferenceList:
#    name = 'output' + str(i) + '.csv'
    urlName = 'https://www.tfrrs.org/lists/' + str(i) + '/'
    url = urlName
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    data = []
    event = soup.find('h3')
    rows = soup.find_all('tr')
#    data.append(event)
    

    for row in rows:
        cols = row.find_all('td')
        cols = [col.text.strip() for col in cols]
        if cols == []:
            data.append([])
            events = event.find_next('h3').text.strip().replace("\n","")
            events = " ".join(events.split())
            events = [events]
            data.append(events)
            event = event.find_next('h3')
        else:
            data.append(cols)
            
            #Changes the order of team events
            if len(data[-1]) == 6:
                team = data[-1][1]
                time = data[-1][2]
                athleteName = data[-1][3]
                data[-1][1] = athleteName
                data[-1][2] = team
                data[-1][3] = time
                data[-1].insert(4, "")
                data[-1].insert(5, "")
                data[-1].insert(2, "")
            
            #Removes (55) and # from the time and distance events
            if len(data[-1][4].split()) > 1:
                data[-1][4] = data[-1][4].split()[0]
                
            #Adds NaN values to distance events
            if 'm' in data[-1][4]:
                data[-1][5] = ""
                data[-1].insert(4, "")
            
            #Adds NaN columns to Mulit-events
            try:
                int(data[-1][4]) == type(int)
            except ValueError:
                if len(data[-1]) == 8 or len(data[-1]) == 7:
                    data[-1].insert(5, "")
                    data[-1].insert(6, "")
            else:
                data[-1].insert(4, "")
                data[-1].insert(5, "")
            
            #Adds NaN to the wind column if there is not a value in it
            if len(data[-1]) == 9:
                data[-1].append("")
                
            #Puts all the competing teams in a list
#            if data[-1][3] not in teamList:
#                teamList.append(data[-1][3])
    for line in data:
        fullData.append(line)

with open("fullDataNoEvents.csv", 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(fullData)
