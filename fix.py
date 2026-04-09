import glob
import re

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('href="/"', 'href="index.html"')
    content = re.sub(r'href="/(.*?\.html)"', r'href="\1"', content)
    content = content.replace('href="/style.css"', 'href="style.css"')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
print("Done")
