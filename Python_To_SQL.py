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
      4230,4283,4295,4276,4285,4289,4299,4284,4291,4233,4287,
      4292,4232,4225,4286,4223,4290,4275,4227,4226,4293,4288]

time_e=["100 Meters","200 Meters","400 Meters","800 Meters","Mile",
        "1500 Meters","3000 Meters","5000 Meters","10,000 Meters",
        "100 Hurdles","110 Hurdles","400 Hurdles","3000 Steeplechase"]

team_e=["4 x 100 Relay", "4 x 400 Relay","4 x 800 Relay"]

dis_e=["High Jump","Pole Vault","Long Jump","Triple Jump",
       "Shot Put","Discus","Hammer","Javelin"]

o = 0

for p in range(3):
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
        con = conference.split()
        if len(con)==7:
            conference = "CCS"
            con = ""
        else:
            conference = " ".join(con[0:-3])
        con = conference.split()
        if len(con)>1:
            conference = "_".join(con)
        if conference == "IC4A/ECAC":
            con = conference.split("/")
            conference = "_".join(con)
        
        # Getting the headers for the columns
        # o==0 is just so that that
        # section of code runs only once
        if o == 0:
            for head in headers:
                he = head.find_all('th')
                he=[h.text.strip() for h in he]
                he[0]='Rank'
                he[1] = 'Athlete'
                he[4]='Time_(I)'
                meet = he[5]
                date = he[6]
                wind = he[7]
                he[5]='Time_(S)'
                he[6] = 'Distance_(m)'
                he[7]='Points'
                he.append(meet)
                he.append(date)
                he.append(wind)
                he.append('Event')
                he.append('Conference')
                he.append('Gender')
                he.append('Event_ID')
                break
            o=1
        # k=0 is for events
        k=0
        for row in rows:
                cols = row.find_all('td')
                cols = [col.text.strip() for col in cols]
                if cols==[]:
                    k=k+1
                    event = events[k].split()
                    gender=event[-1]
                    event = " ".join(event[0:len(event)-1])
                    if gender == '(Men)':
                        gender = 'Men'
                    elif gender == '(Women)':
                        gender = 'Women'
                if cols!=[]:
                    # team events
                    if event in team_e:
                        temp=cols
                        college=temp[1]
                        temp[1]=temp[3]
                        time=temp[2]
                        temp[2]="NA"
                        temp[3]=college
                        meet=temp[4]
                        date=temp[5]
                        temp[4]=time
                        temp.append(0.0)
                        temp.append(0.0)
                        temp.append(meet)
                        temp.append(date)
                        temp.append("")
                        cols=temp
                        split = cols[4].split(":")
                        if len(split)>1:
                            minute=split[0]
                            sec = split[1].split("\n")
                            sec = float(sec[0])
                            time = (float(minute)*60)+sec
                            cols[5]=time
                        else:
                            sec = split[0].split("\n")
                            sec = sec[0].split("(")
                            cols[4]=float(sec[0])
                            cols[5]=cols[4]
                    
                    # timed events
                    elif event in time_e:
                        meet=cols[5]
                        date=cols[6]
                        split = cols[4].split(":")
                        if len(split)>1:
                            minute=split[0]
                            sec = split[1].split("\n")
                            sec = sec[0].split("(")
                            sec = float(sec[0])
                            time = (float(minute)*60)+sec
                            cols[5]=time
                            if event == "400 Meters":
                                cols[4]=time
                        else:
                            sec = split[0].split("\n")
                            sec = sec[0].split("(")
                            cols[4]=float(sec[0])
                            cols[5]=cols[4]
                        if len(cols)==7:
                            wind=""
                            cols.append(meet)
                        elif cols[7] != "":
                            wind=cols[7]
                            if cols[7]!="NWI":
                                wind=""
                            cols[7]=meet
                        cols[6]=0.0
                        cols[7]=0.0
                        cols.append(meet)
                        cols.append(date)
                        cols.append(wind)
                    # distance events
                    elif event in dis_e:
                        split = cols[4].split('.')
                        if len(split)>1:
                            if event=="Long Jump" or event == "Triple Jump":
                                temp2=cols
                                distance = temp2[4].split("m")
                                distance=distance[0]
                                meet=temp2[6]
                                date=temp2[7]
                                if temp2[8]!="NWI":
                                    wind=""
                                else:
                                    wind=temp2[8]
                                temp2[4]=""
                                temp2[5]=0.0
                                temp2[6]=float(distance)
                                temp2[7]=0.0
                                temp2[8]=meet
                                temp2.append(date)
                                temp2.append(wind)
                                cols=temp2
                            else:
                                temp2=cols
                                distance = temp2[4]
                                distance = temp2[4].split("m")
                                distance=distance[0]
                                meet=temp2[6]
                                date=temp2[7]
                                temp2[4]=""
                                temp2[5]=0.0
                                temp2[6]=float(distance)
                                temp2[7]=0.0
                                temp2.append(meet)
                                temp2.append(date)
                                temp2.append("")
                                cols=temp2
                    if event=="Heptathlon" or event=="Decathlon":
                        points=cols[4]
                        meet=cols[5]
                        date=cols[6]
                        cols[4]=""
                        cols[5]=0.0
                        cols[6]=0.0
                        cols.append(float(points))
                        cols.append(meet)
                        cols.append(date)
                        cols.append("")
                    cols.append(event)
                    cols.append(conference)
                    cols.append(gender)
                    cols.append(k)
                    data.append(cols)
    print(d + " cols done")
    conf = []
    df = pd.DataFrame(data, columns = he)
    
    mydb = mysql.connector.connect(
              host="104.197.133.232",
              user="root",
              password="AthleticAnalytics",
              database="trackData"
            )
    cursor = mydb.cursor()
    drop = 'DROP TABLE IF EXISTS ' + d + ';'
    cursor.execute(drop)
    table = ("CREATE TABLE `" + d +"`("
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
        sql = "INSERT INTO " + d + " VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        try:
            cursor.execute(sql, tuple(row))
        except:
            print(row)
            break
        mydb.commit()
        if row[12] not in conf:
            if len(conf)>1:
                print(conf[-1] + " conference done")
            conf.append(row[12])
    sql = "UPDATE `" + d + "` SET `Time_I` = NULL WHERE `Time_I` = '';"
    cursor.execute(sql)
    sql = "UPDATE `" + d + "` SET `Time_S` = NULL WHERE `Time_S` = 0.0;"
    cursor.execute(sql)
    sql = "UPDATE `" + d + "` SET `Distance_m` = NULL WHERE `Distance_m` = 0.0;"
    cursor.execute(sql)
    sql = "UPDATE `" + d + "` SET `Points` = NULL WHERE `Points` = 0.0;"
    cursor.execute(sql)
    print(d + " done")
