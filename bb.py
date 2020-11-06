import re
def enrich(raw_data) :
    v_answer_sheets={}
    #converting raw data to simple dictionary format
    for i in range(0, len(raw_data)):
        user_data    = raw_data[i]
        #print (user_data)
        #output {7: '{3,8,11,15}'}

        user_id      = list(user_data.keys())[0]
        user_answers = list(user_data.values())[0]
        #print(user_answers)
        #output before conversion : {3,8,11,15}  -->string

        #converting string to list (remove {} from the string and split by comma)    
        user_answers=(re.sub('[{}]', '', user_answers)).split(",")
        #print(user_answers)
        #output after conversion : ['3', '8', '11', '15'] -->list

        # v_answer_sheets[user_id]= user_value
        v_answer_sheets[user_id]= user_answers

    #print(v_answer_sheets)
    #output {7: ['3', '8', '11', '15'], 5: ['3', '8', '11', '15'], 3: ['3', '8', '11', '15'], 4: ['3', '8', '11', '15']}
    return v_answer_sheets


raw_data        = [{7: '{3,8,11,15}'}, {5: '{3,8,11,15}'}, {3: '{3,8,11,15}'}, {4: '{3,8,11,15}'}]
v_answer_sheets = enrich(raw_data)
v_intimacies    = {}

#suppose my id is 7
my_id = 7

#extract userid in list (except mine)
v_users = list (v_answer_sheets.keys() )
v_users.remove(my_id)
#print(v_users)

#get my answers in list
my_answer = v_answer_sheets[my_id]
#print(v_my_answer)


for x in range(0, len(v_users) ) : 
    user_id     = v_users[x]
    user_answer = v_answer_sheets[user_id]
        
    #comparing answers
    v_intimacy=0
    for i in range(0 , len(my_answer)):
        
        if user_answer[i]  == my_answer[i] : 
            v_intimacy += 1
     
    v_intimacies[user_id] = v_intimacy


#sort by higher intimacy (intimacy in descending order)
#print(v_intimacies)
#output :{'2': 1, '5': 2, '11': 1}
v_intimacies = {k: v for k, 
                v in sorted(v_intimacies.items(), 
                            key=lambda item: item[1],
                            reverse=True)
               }
#print(v_intimacies)
#output(after sort) :{'5': 2, '2': 1, '11': 1}

v_intimate_users = list (v_intimacies.keys() )
print(v_intimate_users)
v_bff = v_intimate_users[0]
print("bff is {}".format(v_bff))

    
    
    