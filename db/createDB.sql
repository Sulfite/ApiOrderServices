Create database if not exists dbos;
use dbos;

DROP TABLE IF EXISTS `Products_OS`;
DROP TABLE IF EXISTS `Products`;
DROP TABLE IF EXISTS `Services_Orders`;
DROP TABLE IF EXISTS `Types_Services`;
DROP TABLE IF EXISTS `Equipments`;
DROP TABLE IF EXISTS `Sectors`;
DROP TABLE IF EXISTS `Types_Equipments`;
DROP TABLE IF EXISTS `Phones`;
DROP TABLE IF EXISTS `Adresses`;
DROP TABLE IF EXISTS `Cities`;
DROP TABLE IF EXISTS `States`;
DROP TABLE IF EXISTS `Countries`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Types_Access`;
DROP TABLE IF EXISTS `Products`;

CREATE TABLE Types_Access(ID_Type_Access INT NOT NULL PRIMARY KEY AUTO_INCREMENT
                         ,Name_Type_Access    VARCHAR(20));

CREATE TABLE Users(ID_User        INT NOT NULL PRIMARY KEY auto_increment
                  ,Name_User      VARCHAR(150) NOT NULL
                  ,Username       VARCHAR(30)  NOT NULL
                  ,PasswordUser   VARCHAR(250) NOT NULL
                  ,DT_Birth            DATE
                  ,National_Identifier VARCHAR(14) /*CPF: 11 CNPJ:14 sem mascara*/
                  ,Type_Person         CHAR(1)
                  ,ID_Type_Access INT NOT NULL
                  ,Active_User    BOOLEAN DEFAULT TRUE
                  ,DH_Inclusion   DATETIME NOT NULL
                  ,DH_Change      DATETIME
                  ,FOREIGN KEY(ID_Type_Access) references dbos.Types_Access(ID_Type_Access) ON DELETE CASCADE
                  ,CONSTRAINT CHECK_Type_Person CHECK(Type_Person = 'F' OR Type_Person = 'J'));
                  
CREATE TABLE Countries(ID_Country   INT NOT NULL PRIMARY KEY AUTO_INCREMENT
                      ,Name_Country VARCHAR(100) NOT NULL
                      ,Abbreviation CHAR(2)
                      ,Prefix       CHAR(4) NOT NULL);


CREATE TABLE States(ID_State     INT NOT NULL PRIMARY KEY AUTO_INCREMENT
                   ,Name_State   VARCHAR(50)
                   ,Abbreviation Char(2)
                   ,ID_Country   INT NOT NULL
	              ,FOREIGN KEY(ID_Country) references dbos.Countries(ID_Country));

CREATE TABLE Cities(ID_City    INT NOT NULL PRIMARY KEY AUTO_INCREMENT
                   ,Name_City  VARCHAR(150) NOT NULL
                   ,DDD        CHAR(4)
                   ,ID_State   INT NOT NULL
                   ,FOREIGN KEY(ID_State) references States(ID_State));

CREATE TABLE Adresses(ID_Address    INT NOT NULL PRIMARY KEY AUTO_INCREMENT
                     ,Street        VARCHAR(150) NOT NULL
                     ,District      Varchar(100)
                     ,Number_Street Varchar(10)
                     ,CD_Postal     CHAR(8)
                     ,Complement    Varchar(150)
                     ,ID_City       INT NOT NULL
                     ,ID_User       INT
	                ,FOREIGN KEY(ID_City) references dbos.Cities(ID_City)
                    ,FOREIGN KEY(ID_User) references dbos.Users(ID_User));

CREATE TABLE Phones(ID_Phone     INT NOT NULL PRIMARY KEY AUTO_INCREMENT
                   ,Number_Phone INT
	              ,ID_City     INT
                   ,ID_User     INT
	              ,FOREIGN KEY(ID_City) references dbos.Cities(ID_City)
                   ,FOREIGN KEY(ID_User) references dbos.Users(ID_User));

CREATE TABLE Sectors(ID_Sector   INT NOT NULL PRIMARY KEY AUTO_INCREMENT
                    ,Name_Sector VARCHAR(20));

CREATE TABLE Types_Equipments(ID_Type_Equipment   INT NOT NULL PRIMARY KEY AUTO_INCREMENT
                             ,Name_Type_Equipment VARCHAR(20));

CREATE TABLE Types_Services(ID_Type_Service   INT NOT NULL PRIMARY KEY AUTO_INCREMENT
                           ,Name_Type_Service VARCHAR(20)
                           ,Price             NUMERIC(18,2));

CREATE TABLE Equipments(ID_Equipment        INT NOT NULL PRIMARY KEY auto_increment
                       ,Name_Equipment      VARCHAR(150) NOT NULL
					   ,NO_Frota            INT
                       ,Active_Equipment    BOOLEAN DEFAULT TRUE
                       ,ID_Type_Equipment   INT NOT NULL
					   ,ID_Sector_Equipment INT NOT NULL
                       ,ID_User             INT NOT NULL
                       ,DH_Inclusion        DATETIME NOT NULL
                       ,DH_Change           DATETIME
                       ,FOREIGN KEY(ID_User) references dbos.Users(ID_User)
                       ,FOREIGN KEY(ID_Type_Equipment) references dbos.Types_Equipments(ID_Type_Equipment)
					   ,FOREIGN KEY(ID_Sector_Equipment) references dbos.Sectors(ID_Sector));

CREATE TABLE Products(ID_Product   INT NOT NULL PRIMARY KEY auto_increment
                     ,Name_Product VARCHAR(150) NOT NULL
					 ,Amount       INT
                     ,Priece       NUMERIC(18,2)
                     ,DH_Inclusion DATETIME NOT NULL
                     ,DH_Change    DATETIME);

CREATE TABLE Services_Orders(ID_OS            INT NOT NULL PRIMARY KEY auto_increment
                           ,DH_Opening       DATETIME NOT NULL
                           ,DH_Closed        DATETIME
						   ,Detailing        VARCHAR(2000)
                           ,Observation      VARCHAR(250)
                           ,Solution         VARCHAR(250)
                           ,Number_Condition NUMERIC(18,2) /*Horimetro ou KM*/
                           ,ID_Equipment     INT NOT NULL
						   ,ID_User_Customer INT 
                           ,ID_User_Employe INT
                           ,ID_Type_Service  INT NOT NULL
                           ,FOREIGN KEY(ID_Equipment) references dbos.Equipments(ID_Equipment)
						   ,FOREIGN KEY(ID_User_Customer) references dbos.Users(ID_User)
                           ,FOREIGN KEY(ID_User_Employe) references dbos.Users(ID_User)
                           ,FOREIGN KEY(ID_Type_Service) references dbos.Types_Services(ID_Type_Service));
                           
CREATE TABLE Products_OS(ID_Product_OS INT NOT NULL PRIMARY KEY auto_increment
                        ,ID_Product    INT NOT NULL
                        ,ID_OS         INT NOT NULL
                        ,Amount        INT
                        ,Price         NUMERIC(18,2)
                        ,FOREIGN KEY(ID_Product) references dbos.Products(ID_Product)
						,FOREIGN KEY(ID_OS) references dbos.Services_Orders(ID_OS));