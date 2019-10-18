#!/bin/bash
echo -e "\e[32m===============  Merging dev branch into master  ===============\n\e[39m";
git checkout master;
git merge dev;
echo -e "\e[36m\n>>>>>>>>>>>>>> Done merging into master    <<<<<<<<<<<<<<<<<<<<";
echo -e "\e[32m\n===============    Pushing to origin   ===============\n\e[39m";
git commit;
git push;
echo -e "\e[36m\n>>>>>>>>>>>>>> Done pushing into origin    <<<<<<<<<<<<<<<<<<<<";
echo -e "\e[32m\n===============    Building on production server   ===============\n\e[39m";
ssh -i ~/Instance1.pem ec2-user@dlarm.me "cd /var/www/itsdlarm; sudo ./update; exit;";
git checkout dev;
echo -e "\e[36m\n>>>>>>>>>>>>>> Deployment Complete <<<<<<<<<<<<<<<<<<<<\e[39m";


