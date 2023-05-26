# -*- coding: utf-8 -*-
"""
Created on Mon Apr  3 18:19:37 2023

@author: brianholton
@help: jacobspeirer
"""

import requests 
from bs4 import BeautifulSoup
import pandas as pd
import mysql.connector

diii = [4248, 4237, 4270, 4246, 4301, 4267, 4242, 4245, 4244, 4273,
        4247, 4272, 4243, 4249, 4250, 4251, 4252, 4254, 4238, 4253,
        4274, 4258, 4240, 4255, 4256, 4269, 4257, 4222, 4260, 4259,
        4261, 4235, 4234, 4265, 4262, 4236, 4263, 4264, 4271, 4266]

dii = [4200,4191,4180,4181,4194,4182,4183,4184,4199,4196,4198,
        4189,4185,4195,4186,4187,4179,4192,4193,4188,4190,4197]

di = [4280,4277,4279,4278,4296,4231,4281,4282,4229,4228,4224,
      4230,4283,4276,4285,4289,4284,4291,4233,4287,
      4292,4232,4225,4286,4223,4290,4275,4227,4226,4293,4288]

time_e = {"100 Meters":1,"200 Meters":3,"400 Meters":5,"800 Meters":7,"1500 Meters":9,
      "Mile":11,"3000 Meters":13,"5000 Meters":15,"10,000 Meters":17,
        "100 Hurdles":19,"110 Hurdles":21,"400 Hurdles":23,"3000 Steeplechase":25}

team_e = {"4 x 100 Relay":27, "4 x 400 Relay":29,"4 x 800 Relay":31}

dis_e={"High Jump":33,"Pole Vault":35,"Long Jump":37,"Triple Jump":39,
       "Shot Put":41,"Discus":43,"Hammer":45,"Javelin":47}

def eventHeaders(headers):
    for head in headers:
        he = head.find_all('th')
        he=[h.text.strip() for h in he]
        he[0]='Rank'
        he[1] = 'Athlete'
        he[4]='Time_I'
        meet,he[5] = he[5],'Time_S'
        date,he[6] = he[6],'Distance_(m)'
        wind,he[7] = he[7],'Points'
        he.append(meet)
        he.append(date)
        he.append(wind)
        he.append('Event')
        he.append('Conference')
        he.append('Gender')
        he.append('Event_ID')
        break
    return he

def formatTimeString(timeString):
    timeCom = rowCols[4].split(":")
    comLen = len(timeCom)
    if len(timeCom)>1:
        minute=timeCom[0]
        sec = timeCom[1].split("\n")
        sec = sec[0].split("(")
        sec = float(sec[0])
        time = (float(minute)*60)+sec
    else:
        sec = timeCom[0].split("\n")
        sec = sec[0].split("(")
        sec=float(sec[0])
        time=sec
    return time, comLen

def eventIDNum(event, gender):
    if event=="Heptathlon":
        idNum = 49
    elif event=="Decathlon":
        idNum = 50
    else:
        if gender=="Women":
            if event in time_e:
                idNum = time_e[event]+1
            elif event in team_e:
                idNum = team_e[event]+1
            else:
                idNum = dis_e[event]+1
        else:
            if event in time_e:
                idNum = time_e[event]
            elif event in team_e:
                idNum = team_e[event]
            else:
                idNum = dis_e[event]
    return idNum

url = 'https://www.tfrrs.org/lists/4200/'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')
headers = soup.find_all('thead')
headings=eventHeaders(headers)

for p in range(1):
    if p==0:
        division = diii
        d = "diii"
    elif p==1:
        division=dii
        d="dii"
    elif p==2:
        division=di
        d="di"
    data = []
    for i in division:
        urlName = 'https://www.tfrrs.org/lists/' + str(i) + '/'
        url = urlName
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        colleges = []
        rows = soup.find_all('tr')
        headers = soup.find_all('thead')
        events = soup.find_all('h3')
        events = [event.text.strip() for event in events]
        conference = events[0]
        # splitting off outdoor performance list
        conf = conference.split()
        if len(conf)==7:
            conference = "CCS"
        else:
            conference = "_".join(conf[0:-3])
        
        # event, including conference, finder per empty row counter
        j=0
        for row in rows:
            rowCols = row.find_all('td')
            rowCols = [col.text.strip() for col in rowCols]
            if rowCols==[]: #blank row
                j=j+1
                event = events[j].split()
                gender=event[-1]
                event = " ".join(event[0:len(event)-1])
                if gender == '(Men)':
                    gender = 'Men'
                elif gender == '(Women)':
                    gender = 'Women'
            else:
                # team events
                if event in team_e:
                    rowCols[1],rowCols[3]=rowCols[3],rowCols[1]
                    rowCols[4],rowCols[2]=rowCols[2],"NA"
                    meet=rowCols[4]
                    date=rowCols[5]
                    rowCols.append(0.0)
                    rowCols.append(0.0)
                    rowCols.append(meet)
                    rowCols.append(date)
                    rowCols.append("-")
                    rowCols[5],timeLen = formatTimeString(rowCols[4])
                    if timeLen==1:
                        rowCols[4]=rowCols[5]
                
                # timed events
                elif event in time_e:
                    meet=rowCols[5]
                    date=rowCols[6]
                    rowCols[5],timeLen = formatTimeString(rowCols[4])
                    if timeLen==1 or event == "400 Meters":
                        rowCols[4]=rowCols[5]
                    if len(rowCols)==7 or rowCols[7]=="":
                        wind="-"
                        rowCols.append(0.0)
                    else:
                        wind=rowCols[7]
                    rowCols[6]=0.0
                    rowCols[7]=0.0
                    rowCols.append(meet)
                    rowCols.append(date)
                    rowCols.append(wind)
                        
                # distance events
                elif event in dis_e:
                    split = rowCols[4].split('.')
                    if len(split)>1:
                        if len(rowCols)==8 or rowCols[8]=="":
                            wind="-"
                        else:
                            wind=rowCols[8]
                        distance = rowCols[4].split("m")
                        distance=distance[0]
                        meet=rowCols[6]
                        date=rowCols[7]
                        rowCols[4]="-"
                        rowCols[5]=0.0
                        rowCols[6]=float(distance)
                        rowCols[7]=0.0
                        if len(rowCols)==8:
                            rowCols.append(meet)
                        else:
                            rowCols[8]=meet
                        rowCols.append(date)
                        rowCols.append(wind)
                        
                # points events
                elif event=="Heptathlon" or event=="Decathlon":
                    points=rowCols[4]
                    meet=rowCols[5]
                    date=rowCols[6]
                    rowCols[4]="-"
                    rowCols[5]=0.0
                    rowCols[6]=0.0
                    rowCols.append(float(points))
                    rowCols.append(meet)
                    rowCols.append(date)
                    rowCols.append("-")
                        
                eventID = eventIDNum(event, gender)
                # appending descriptor variables
                rowCols.append(event)
                rowCols.append(conference)
                rowCols.append(gender)
                rowCols.append(eventID)
                rowCols[0]=int(rowCols[0])
                data.append(rowCols)
    
    print(d + " rows done")
    conf = []
    df = pd.DataFrame(data, columns = headings)
    mydb = mysql.connector.connect(
              host="104.197.133.232",
              user="root",
              password="AthleticAnalytics",
              database="trackData"
            )
    cursor = mydb.cursor()
    drop = 'DROP TABLE IF EXISTS `test`;'
    cursor.execute(drop)
    table = ("CREATE TABLE `test`("
              "`Ranking` int,"
              "`Athlete` text,"
              "`Year` text,"
              "`College` text,"
              "`Time_I` text DEFAULT NULL,"
              "`Time_S` double DEFAULT NULL,"
              "`Distance_m` double DEFAULT NULL,"
              "`Points` double DEFAULT NULL,"
              "`Meet` text,"
              "`Meet_Date` text,"
              "`Wind` text DEFAULT NULL,"
              "`Event` text,"
              "`Conference` text,"
              "`Gender` text,"
              "`Event_ID` int)")
    cursor.execute(table)
    print("Table is created")
    for i, row in df.iterrows():
        sql = "INSERT INTO test VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        try:
            cursor.execute(sql, tuple(row))
        except:
            for variable in range(len(row)):
                print(str(row[variable]) + " is a " + str(type(row[variable])))
            break
        mydb.commit()
        if row[12] not in conf:
            if len(conf)>=1:
                print(conf[-1] + " conference done")
            conf.append(row[12])
    print(conf[-1] + " conference done")
    
    # replacing zeroes and blanks in
    # certain columns with null
    sql = "UPDATE `" + d + "` SET `Time_I` = NULL WHERE `Time_I` = '-';"
    cursor.execute(sql)
    sql = "UPDATE `" + d + "` SET `Time_S` = NULL WHERE `Time_S` = 0.0;"
    cursor.execute(sql)
    sql = "UPDATE `" + d + "` SET `Distance_m` = NULL WHERE `Distance_m` = 0.0;"
    cursor.execute(sql)
    sql = "UPDATE `" + d + "` SET `Points` = NULL WHERE `Points` = 0.0;"
    cursor.execute(sql)
    sql = "UPDATE `" + d + "` SET `Wind` = NULL WHERE `Wind` = '-';"
    cursor.execute(sql)
    print(d + " done")
mydb.close()
