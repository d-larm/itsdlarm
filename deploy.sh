#!/bin/bash
git checkout master;
echo 'Merging dev branch into master';
git merge dev;
echo 'Done merging into master';
echo 'Pushing to origin';
git commit;
git push;
echo 'Done pushing to origin';
echo 'Building production app on server';
ssh -i Instance1.pem ec2-user@dlarm.me "cd /var/www/itsdlarm; sudo ./update; exit;";


