app_urgence
===========

A Symfony project created on January 14, 2016, 4:36 pm.


Setup serveur
=============
aptitude install git-core
git config --global user.name "user_name"
git config --global user.email "user_name@domaine.tld"
git clone https://github.com/itlink-hackathon/app-urgence.git

ne connaissant pas le mot de passe root, j'ai réinstallé mysql avec l'aide de : http://stackoverflow.com/a/10861439
mysql 5.6 est nécessaire (la 5.5 est la version actuellement présente sur les repositories). http://xmodulo.com/upgrade-mysql-server-debian-ubuntu.html

mysql
CREATE DATABASE IF NOT EXISTS `app-urgence` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

Edition de /etc/apache2/sites-available/default :
ajout de :

Alias /urgence/ "/root/app-urgence/web/" 

<Directory "/root/app-urgence/web/">
    Options Indexes FollowSymLinks MultiViews
		AllowOverride all
		Require all granted
</Directory>

service apache2 restart

installation de composer :
curl -sS https://getcomposer.org/installer | php
puis 
php composer.phar install

en cas d'erreur sur la timezone, éditer app/AppKernel.php et ajouter après les includes : 

date_default_timezone_set('UTC');

en cas d'erreur 500 (ou rien affiché), regarder les logs a pache (/var/log/apache2/error.log) : il manquait sqlite (apt-get install php5-sqlite)
CREATE DATABASE IF NOT EXISTS app-urgence DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

CREATE DATABASE app-urgence DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

grant all privileges on *.* to bill@localhost identified by 'pass' with grant option;
