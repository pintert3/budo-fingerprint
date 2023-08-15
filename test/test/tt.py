#



num = int(input('prime numbers below: '))
for number in range(1,num + 1):
    
    if number % 2 == 0:
        print(number,'is an even number')
    elif number % 2 == 1:
        print(number,'is an odd number')

