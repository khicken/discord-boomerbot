git add .
set /p msg=Enter Commit Message(use "" if more than one word): 
git commit -m %msg%
git push
pause
set /p logCheck=Would you like to display heroku logs? (y/n) - 
if %log%==y || %log%==yes heroku logs --tail -a discord-boomer-bot
pause