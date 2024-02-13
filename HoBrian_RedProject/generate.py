import uuid
import random

button_text = [
    'heeeeeeeeee'
    'hoooooooooooo',
    'hiiiiiiiiiii',
    'my, my, my, my',
    'la-la-la-la'
]

def button(content, link):
    return '<a href="' + link + '">' + content + '</a>\n'


correct = str(uuid.uuid4())

buttons = [button(random.choice(button_text),
                  f'/{str(uuid.uuid4())}') for _ in range(1000)] + [button('ha-ha', f'/{correct}')]

random.shuffle(buttons)

buttons = '\t'.join(buttons)

with open('views/links.ejs', 'w') as f:
    f.write(f'''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>hi</title>
</head>
<body>
    { buttons }
</body>
</html>
'''.strip())

flag = open('flag.txt').read()

with open(f'views/{correct}', 'w') as f:
    f.write(flag)
    
#this code is inspired by the challenge "buttons" written by Diana Lin, TJ Class of 2024