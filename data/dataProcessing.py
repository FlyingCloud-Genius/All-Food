
#data cleaning
index = []  
modify = []
for i in range(data_len):
    pl = str(new_name[i]).find(' i ')
    if pl != -1:
        m = new_name[i]
        newstr = m.replace(' n ', '')
        index.append([i,new_name[i],newstr])
index = []
modify = []
for i in range(data_len):
    pl = str(name[i]).find(' s ')
    if pl != -1:
        index.append([i,name[i],name[i][pl+3:]])
        modify.append(name[i][pl+3:])
        new_name[i] = name[i][pl+3:]
index = []
modify = []
for i in range(data_len):
    pl = str(new_name[i]).find('  ')
    if pl != -1:
        new_name[i] = new_name[i][pl+2:]
for i in range(data_len):
    if (str(new_name[i])[0:3]) == 'my ' or (str(new_name[i])[0:2]) == 'i '
		or (str(new_name[i])[0:3]) == 'we ' or (str(new_name[i])[0:4]) == 'you ':
        new_name[i] = ''
    p1 = str(new_name[i]).find('your ')
    if p1 != -1:
        new_name[i] = ''
    p2 = str(new_name[i]).find(' me ')
    if p2 != -1:
        new_name[i] = ''
    p3 = str(new_name[i]).find(' our ')
    if p3 != -1:
        new_name[i] = ''
    p4 = str(new_name[i]).find(' ever ')
    if p4 != -1:
        new_name[i] = ''
		


##tag		
tag_low = tag_csv['low_in_something'][0:8]
low_result = [0]*data_len
for i in range(data_len):   
    strlist = (tag[i][1:-1]).split(', ') 
    re_list = []
    for j in range(len(strlist)):      
        for k in range(8):
            if strlist[j][1:-1] == tag_low[k]:
                re_list.append(tag_low[k])
    if (len(re_list)!=0):
        
        low_result[i]=re_list
		
nut_list = []
result = 0
for i in range(data_len):
    result = 0
    strlist = (str(ingredient[i])[1:-1]).split(', ') 
    for j in range(len(strlist)):
        if strlist[j][1:-1].find('nut') != -1:
            result = 1
            print(strlist[j][1:-1])
    nut_list.append(result)
	
egg_list = []
result = 0
for i in range(data_len):
    result = 0
    strlist = (str(ingredient[i])[1:-1]).split(', ') 
    for j in range(len(strlist)):
        if strlist[j][1:-1].find('egg') != -1:
            result = 1
            print(strlist[j][1:-1])
    egg_list.append(result)
	
spicy_list = []
result = 0
for i in range(data_len):
    result = 0
    strlist = (str(ingredient[i])[1:-1]).split(', ') 
    for j in range(len(strlist)):
        if strlist[j][1:-1].find('pepper') != -1 
			or strlist[j][1:-1].find('chili') != -1:
            result = 1
            print(strlist[j][1:-1])
    spicy_list.append(result)
		
		

