# -*- coding: utf-8 -*-
"""
Created on Mon Apr  3 18:19:37 2023

@author: jespe
"""

import requests 
from bs4 import BeautifulSoup
import pandas as pd
from sqlalchemy import create_engine
import pyodbc


# diii = [4268, 4248, 4237, 4270, 4246, 4301, 4267, 4242, 4245, 4244, 4273,
#         4247, 4272, 4243, 4249, 4250, 4251, 4252, 4254, 4238, 4253, 4274,
#         4258, 4294, 4240, 4255, 4256, 4269, 4257, 4222, 4260, 4259,
#         4261, 4235, 4234, 4265, 4262, 4236, 4263, 4264, 4271, 4266]
# dii = [4200,4191,4180,4181,4194,4182,4183,4184,4199,4196,4198,
#         4189,4185,4195,4186,4187,4179,4192,4193,4188,4190,4197]
diii = [4222]

# di = [4280,4277,4279,4278,4296,4231,4281,4282,4229,4228,4224,4230,
#       4283,4295,4276,4285,4289,4299,4284,4291,4233,4287,4294,
#       4292,4232,4225,4286,4223,4290,4275,4227,4226,4293,4288]
o = 0

for p in range(1):
    if p==0:
        csvname = "diii.csv"
        division = diii
    # if p==1:
    #     division=dii
    # else:
    #     division=di
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
        name = conference + '.csv'
        
        # Getting the headers for the columns
        # o==0 is just so that that
        # section of code runs only once
        if o == 0:
            for head in headers:
                he = head.find_all('th')
                he=[h.text.strip() for h in he]
                he[0]='Rank'
                he[1] = 'Athlete'
                he[4]='Time'
                meet = he[5]
                he[5] = 'Distance'
                date = he[6]
                he[6]='Points'
                wind = he[7]
                he[7]=meet
                he.append(date)
                he.append(wind)
                he.append('Event')
                he.append('Conference')
                he.append('Gender')
                he.append('Event_ID')
                break
            o=1
        #data.append(he)
        # k=0 is for events
        k=0
        for row in rows:
                cols = row.find_all('td')
                cols = [col.text.strip() for col in cols]
                if cols==[]:
                    # l=0 is so that the event/gender splitter
                    # only has to run once per event
                    l=0
                    k=k+1
                    if l == 0:
                        event = events[k].split()
                        gender=event[-1]
                        event = " ".join(event[0:len(event)-1])
                        if gender == '(Men)':
                            gender = 'Men'
                        elif gender == '(Women)':
                            gender = 'Women'
                        l = 1
                if cols!=[]:
                    
                    # these two if statements are to rearrange
                    # the columns during multi-people events
                    if cols[3] not in colleges:
                        colleges.append(cols[3])
                    if cols[1] in colleges or len(cols)==6:
                        temp=cols
                        college=temp[1]
                        temp[1]=temp[3]
                        time=temp[2]
                        temp[2]="NA"
                        temp[3]=college
                        meet=temp[4]
                        date=temp[5]
                        temp[4]=time
                        temp[5]=""
                        temp.append("")
                        temp.append(meet)
                        temp.append(date)
                        temp.append("")
                        cols=temp
                        split = cols[4].split(":")
                        if len(split)>1:
                            minute=split[0]
                            sec = split[1].split("\n")
                            sec = round(float(sec[0]))
                            if sec<60:
                                time = str(minute) + ":"+str(sec)
                            else:
                                minute=int(minute)+1
                                sec=":00"
                                time=str(minute) + sec
                            cols[4]=time
                    
                    elif k<=24:
                        split = cols[4].split(":")
                        if len(split)>1:
                            minute=split[0]
                            sec = split[1].split("\n")
                            sec = sec[0].split("(")
                            sec = float(sec[0])
                            #sec = round(float(split[1].strip().replace("\n","")))
                            if event == "400 Meters":
                                minute = float(minute)*60
                                time = minute+sec
                                time = str(time)
                            else:
                                sec = round(sec)
                                sec = int(sec)
                                if sec<60:
                                    if sec<10:
                                       time = str(minute) + ":0"+str(sec) 
                                    else:
                                       time = str(minute) + ":"+str(sec)
                                else:
                                    minute=int(minute)+1
                                    sec=":00"
                                    time=str(minute) + sec
                            cols[4]=time
                        meet=cols[5]
                        date=cols[6]
                        if len(cols)==7:
                            wind=""
                            cols.append(meet)
                        elif cols[7] != "":
                            wind=cols[7]
                            if cols[7]=="NWI":
                                wind=""
                            cols[7]=meet
                        cols[5]=""
                        cols[6]=""
                        
                        cols.append(date)
                        cols.append(wind)
                    # checking for the distance events
                    elif k>24:
                        split = cols[4].split('.')
                        if len(split)>1:
                            if event=="Long Jump" or event == "Triple Jump":
                                temp2=cols
                                distance = temp2[4]
                                meet=temp2[6]
                                date=temp2[7]
                                if temp2[8]=="NWI":
                                    wind=""
                                else:
                                    wind=temp2[8]
                                temp2[4]=""
                                temp2[5]=distance
                                temp2[6]=""
                                temp2[7]=meet
                                temp2[8]=date
                                temp2.append(wind)
                                cols=temp2
                            else:
                                temp2=cols
                                distance = temp2[4]
                                meet=temp2[6]
                                date=temp2[7]
                                temp2[4]=""
                                temp2[5]=distance
                                temp2[6]=""
                                
                                temp2[7]=meet
                                temp2.append(date)
                                temp2.append("")
                                # print(len(temp2))
                                # break
                                # if len(cols)!= 9:
                                #     temp2[7]=""
                                # else:
                                #     temp2[7]=temp2[8]
                                #     del temp2[8]
                                cols=temp2
                                #print(event)
                    if event=="Heptathlon" or event=="Decathlon":
                        points=cols[4]
                        meet=cols[5]
                        date=cols[6]
                        cols[4]=""
                        cols[5]=""
                        cols[6]=points
                        cols.append(meet)
                        cols.append(date)
                        cols.append("")
                    # adding NaN if there is nothing in wind column
                    # if len(cols)==7:
                    #     cols.append('')
                    # elif len(cols)==8 and cols[7]=='':
                    #     cols[7]=''
                    cols.append(event)
                    cols.append(conference)
                    cols.append(gender)
                    cols.append(k)
                    # if event == "10,000 Meters":
                    #     print(cols)
                    #     split=cols[4].split(":")
                    #     print(split)
                    #     cols[4]=":".join(split[0:2])
                    data.append(cols)
        dataframes = {}
        df = pd.DataFrame(data, columns = he)
        conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=104.197.133.232;'
                      'Database=diii;'
                      'Trusted_Connection=yes;')
        # engine = create_engine('mysql+mysqldb://root:AthleticAnalytics@104.197.133.232/diii')
        # df.to_sql(con=engine, name='Test_Scrap', if_exists='replace', index=False)