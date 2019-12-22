# -*- coding: utf-8 -*-
"""
Created on Sat Dec  7 17:10:59 2019

@author: Think
"""

'''
--------- importing data -------------
'''

import pandas as pd
import numpy as np
import sys
import json
from os import path
import argparse
import urllib
import urllib.request
import requests

#import config
#from utils import URL_to_filename

# 2 parameters

param0 = sys.argv[0]
#param1 = sys.argv[1]
#users = pd.read_csv('D:\Learning Materials\\Statistics\\Probrability and Statistics II\\Assignments\\Assignment 3\\AB.csv')
'''
users = pd.read_csv('D:\\Learning Materials\\Engineering General Courses\\ERG3010\\Final Project\\Project\\Recommendation System\\finalUser.csv')
dishes = pd.read_csv('D:\\Learning Materials\\Engineering General Courses\\ERG3010\\Final Project\\Project\\Recommendation System\\1202\\finalData.csv',encoding="ISO-8859-1")
dishes.values
tags = dishes.iloc[23]
samplevector = tags[23]
users.values
data = users.iloc[1]
#dataid = data[1]
#datataste = data[2]
datapeople = data[3]
#dataregions = data[6]
directs = users.iloc[3][1]
userMap = {}
'''

'''
---------- User Class ----------------
'''
class User:
    userCount = 0
    
    def __init__(self, id, tastes, target_people, taboo, disease, regions):
        self.id = id
        self.tastes = tastes
        self.target_people = target_people
        self.taboo = taboo
        self.disease = disease
        self.regions = regions
        User.userCount = 1
    
    def getCount(self):
        return User.userCount
    
    def getId(self):
        return self.id
    
    def getTastes(self):
        return self.tastes
    
    def getTargetPeople(self):
        return self.target_people
    
    def getTaboo(self):
        return self.taboo
    
    def getDisease(self):
        return self.disease
    
    def getRegions(self):
        return self.regions
 
def splitStr(rawStr):
    cleanStr = []
    rawStr = str(rawStr)
    rawList = rawStr.split("'")
    strLen = len(rawList)
    i = 1
    if strLen < 2:
        return cleanStr
    while i < strLen - 1:
        cleanStr.append(rawList[i])
        i = i + 2
    return cleanStr

def splitStr2(rawStr):
    cleanStr = []
    rawList = rawStr.split(",")
    strLen = len(rawList)
    i = 0
    if strLen < 1:
        return cleanStr
    while i < strLen:
        if i == 0:
            num1 = rawList[i]
            cleanStr.append(int(num1[1]))
        elif i == strLen - 1:
            numn = rawList[i]
            cleanStr.append(int(numn[1]))
        else:
            cleanStr.append(int(rawList[i]))
        i = i + 1
    return cleanStr

def translate(user):
    cleanTastes = splitStr(user.getTastes())
    cleanTargetPeople = splitStr(user.getTargetPeople())
    cleanTaboo = splitStr(user.getTaboo())
    #print(user.getTaboo())
    cleanDisease = splitStr(user.getDisease())
    cleanRegions = splitStr(user.getRegions())
    tagList = cleanTastes + cleanTargetPeople + cleanTaboo + cleanDisease + cleanRegions
    processedList = [0]*19
    # falvor
    if 'sweet' in tagList:
        processedList[17] = 1
    if 'spicy' in tagList:
        processedList[18] = 1
    # target people
    if 'vegetarian' in tagList:
        processedList[11] = 1
    if 'smoker' in tagList:
        processedList[12] = 1
    if 'dietary' in tagList:
        processedList[13] = 1
    if 'diabetic' in tagList:
        processedList[14] = 1
    if 'vegan' in tagList:
        processedList[15] = 1
    if 'kid' in tagList:
        processedList[16] = 1
    # taboo
    if 'lactose' not in tagList:
        processedList[7] = 1
    if 'gluten' not in tagList:
        processedList[8] = 1
    if 'egg' not in tagList:
        processedList[9] = 1
    if 'nut' not in tagList:
        processedList[10] = 1
    # disease
    if 'diabets' in tagList:
        processedList[2] = 1
        processedList[5] = 1
    if 'hypertension' in tagList:
        processedList[5] = processedList[5] + 1
    if 'hypotension' in tagList:
        processedList[6] = 1
    if 'cardiovascular disease' in tagList:
        processedList[1] = 1
        processedList[2] = processedList[2] + 1
        processedList[4] = 1
        processedList[6] = processedList[6] + 1
    if 'obesity' in tagList:
        processedList[0] = 1
        processedList[1] = processedList[1] + 1
        processedList[2] = processedList[2] + 1
        processedList[3] = processedList[3] + 1
    if 'anemia' in tagList:
        processedList[2] = processedList[2] + 1
        processedList[3] = processedList[3] + 1
    return processedList

def df2User(userData):
    userId = 1#userData['user_id']
    userTastes = userData['taste']
    userTarget = userData['forWhom']
    userTaboo = userData['myPreference']
    userDisease = userData['myPreference']
    userRegions = userData['region']
    newUser = User(userId,userTastes,userTarget,userTaboo,userDisease,userRegions)
    userMap[userId] = newUser
    return newUser


def distance(list1,list2):
    n = len(list1)
    dist = 0
    for i in range(n):
        dist = dist + (list1[i] - list2[i])**2
    dist = dist**0.5
    return dist


def close(user,data):
    userVector = translate(user)
    #print(data)
    dataVector = data['tagSummary']
    #dataVector = splitStr2(rawDataVector)
    dist = distance(userVector, dataVector)
    return dist

def close2(user1, user2):
    userVector1 = translate(user1)
    userVector2 = translate(user2)
    dist = distance(userVector1, userVector2)
    return dist

def close15(user,dataFrame):
    size = len(dataFrame)
    distanceList = []
    minDist = []
    minDistIndex = []
    user = df2User(user)
    for i in range(min([1000,size])):
        newDist = close(user,dataFrame.iloc[i])
        distanceList.append(newDist)
        if i < 15:
            minDist.append(newDist)
            minDistIndex.append(i)
        else:
            if newDist < max(minDist):
                maxdex = minDist.index(max(minDist))
                minDist[maxdex] = newDist
                minDistIndex[maxdex] = i
    closeList = []
    #print(minDistIndex)
    for i in range(15):
        minindex = minDistIndex[i]
        closeList.append(int(dataFrame.iloc[minindex]['dishId']))
    return closeList

def close15User(user,userDataFrame):
    size = len(userDataFrame)
    distanceList = []
    minDist = []
    minDistIndex = []
    for i in range(min([1000,size])):
        cUser = userDataFrame.iloc[i]
        newDist = close(user, cUser)
        distanceList.append(newDist)
        if i < 15:
            minDist.append(newDist)
            minDistIndex.append(i)
        else:
            if newDist < max(minDist):
                maxdex = minDist.index(max(minDist))
                minDist[maxdex] = newDist
                minDistIndex[maxdex] = i
    closeList = []
    for i in range(15):
        minindex = minDistIndex[i]
        closeList.append(int(userDataFrame.iloc[minindex][0]))
    return closeList

def recommend(param1):
    userDataFrame
    dishesDataFrame
    index1 = param1.find("{")
    index2 = param2.find("}")
    rawData = param1[index1:index2+1]
    '''Data = {}
    dataList = rawData.split(",")
    n = len(dataList)
    for i in range(n):
        if i = 0:
            datai = dataList[i]
            dataiList = datai.split(":")
            dataid = datai[0]
            dataid = dataid[1:]
            datacontent = datai[1]
            Data[dataid] = datacontent
        elif i = n-1:
            datai = dataList[i]
            dataiList = datai.split(":")
            dataid = datai[0]
            datacontent = datai[1]
            m = len(datacontent)
            datacontent = datacontent[:m-1]
            Data[dataid] = datacontent
    jsonStr = json.dumps(rawData)'''
    data = json.loads(rawData)
    userId = data['id']
    dfId = userDataFrame['id']
    n = len(dfId)
    for i in rnage(n):
        if dfId[i] == userId:
            break
    tUser = userDataFrame.iloc[i]
    tUser = df2User(tUser)
    recommendedList = close15(tUser,dishesDataFrame)
    return recommendedList

def main(user):
    if user is None:
        user = '''{"userName": "cloud","age": 22,"weight": 70,"height": 178,"eMail": "116010264@link.cuhk.edu.cn","phoneNumber": "17722545751","createTime": null,"region": "jiangxi","taste": "spicy","forWhom": "YYT","myFavoriteDishes": [],"myUploadDish": [],"myUploadMenu": [],"myFavoriteMenu": [],"myPreference": []}'''
        user = json.loads(user)
        user = [user]
        user = pd.DataFrame(user)
    response = requests.get('http://10.21.38.20:5000/dish/param?limit=10000')
    versionInfo = response.text
    versionInfoPython = json.loads(versionInfo)
    dataList = versionInfoPython.get('data')
    #print(dataList)
    dataFrame = pd.DataFrame(dataList)
    idList = close15(user,dataFrame)
    rawOut = {}
    rawOut['id'] = idList
    rawOut = [rawOut]
    out = json.dumps(rawOut)
    print(out)
    return out
    

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--id', type=str, default='1',
                        help='User ID')
    #args = parser.parse_args()
    args = '''{"userName": "cloud","age": 22,"weight": 70,"height": 178,"eMail": "116010264@link.cuhk.edu.cn","phoneNumber": "17722545751","createTime": null,"region": "jiangxi","taste": "spicy","forWhom": "YYT","myFavoriteDishes": [],"myUploadDish": [],"myUploadMenu": [],"myFavoriteMenu": [],"myPreference": []}'''
    #try:
    user = json.loads(args)
    user = [user]
    user = pd.DataFrame(user)
    main(user)
    #except:
        #print('error')
