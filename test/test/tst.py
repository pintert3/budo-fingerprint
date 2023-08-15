num_elements = int(input("Enter the number of elements: "))
numbers_list = []

for i in range(num_elements):
    num = float(input(f"Enter element {i + 1}: "))
    numbers_list.append(num)

total = sum(numbers_list)
average_mark = total/num_elements

def asign_grade(average_mark):
    if average_mark > 80:
        print('You passed, your average mark is',average_mark)
    elif  average_mark > 61:
        print(average_mark,'This is not bad,you can still improve')
    else:
        print(average_mark)
        print('Try to improve, you can still make it')
        
asign_grade(average_mark)        
