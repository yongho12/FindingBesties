v_answer_sheets={"7":[1,3,4,5],"2":[1,2,3,3],"5":[2,3,4,5],"11":[1,2,3,4]}
v_intimacies   = {}

#suppose my id is 7
my_id="7"

#extract userid in list (except mine)
v_users = list (v_answer_sheets.keys() )
v_users.remove(my_id)
print(v_users)

# #get my answers in list
my_answer = v_answer_sheets[my_id]
# print(my_answer)
#print(v_my_answer)


# v_users['2', '5', '11']
for x in range(0, len(v_users) ) : 
    user_id     = v_users[x]
    user_answer = v_answer_sheets[user_id]
        
    #comparing answers
    v_intimacy=0
    for i in range(0 , len(my_answer)):
        
        if user_answer[i]  == my_answer[i] : 
            v_intimacy += 1
     
    v_intimacies[user_id] = v_intimacy
    

print(v_intimacies)


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
v_bff = v_intimate_users[0]
print("bff is {}".format(v_bff))

print(v_intimate_users)

    # #######################
for x in range(0, len(v_users) ) : 
    user_id     = v_users[x]
    user_answer = v_answer_sheets[user_id]
        
    #comparing answers
    v_intimacy=0
    for i in range(0 , len(my_answer)):
        print("userid:{}, user_answer{}, my_answer{}".format(user_id, user_answer[i], my_answer[i] ))
        if user_answer[i]  == my_answer[i] : 
            v_intimacy += 1
     
    v_intimacies[user_id] = v_intimacy