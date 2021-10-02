echo "> check pid"
CURRENT_PID=$(ps -ef | grep java | grep app-0.0.1* | awk '{print $2}')
echo "$CURRENT_PID"
if [ -z $CURRENT_PID ]; then
echo "> not running."
else
echo "> sudo kill -9 $CURRENT_PID"
sudo kill -9 $CURRENT_PID
sleep 10
fi
echo ">deploy new Project"
sudo java -jar ../target/app-0.0.1-SNAPSHOT.war &
