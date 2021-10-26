if [ -d "./dist" ] 
then
    npm start
else
    echo "start new build." 
    npm run build
    npm start
fi