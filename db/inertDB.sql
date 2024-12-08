use dbos;

INSERT INTO Types_Access(Name_Type_Access) 
VALUES ('Adm')
      ,('Empresa')
      ,('Funcionario')
      ,('Cliente');  
      
INSERT INTO dbos.Countries(Name_Country, Abbreviation, Prefix) VALUES ('Brasil', 'BR', '55');

INSERT INTO dbos.States(Name_State, Abbreviation, ID_Country) 
                VALUES('Acre', 'AC', 1)
                     ,('Alagoas', 'AL', 1)
                     ,('Amapá', 'AP', 1)
                     ,('Amazonas', 'AM', 1)
                     ,('Bahia', 'BA', 1)
                     ,('Ceará', 'CE', 1)
                     ,('Distrito Federal', 'DF', 1)
                     ,('Espírito Santo', 'ES', 1)
                     ,('Goiás', 'GO', 1)
                     ,('Maranhão', 'MA', 1)
                     ,('Mato Grosso', 'MT', 1)
                     ,('Mato Grosso do Sul', 'MS', 1)
                     ,('Minas Gerais', 'MG', 1)
                     ,('Pará', 'PA', 1)
                     ,('Paraíba', 'PB', 1)
                     ,('Paraná', 'PR', 1)
                     ,('Pernambuco', 'PE', 1)
                     ,('Piauí', 'PI', 1)
                     ,('Rio de Janeiro', 'RJ', 1)
                     ,('Rio Grande do Norte', 'RN', 1)
                     ,('Rio Grande do Sul', 'RS', 1)
                     ,('Rondônia', 'RO', 1)
                     ,('Roraima', 'RR', 1)
                     ,('Santa Catarina', 'SC', 1)
                     ,('São Paulo', 'SP', 1)
                     ,('Sergipe', 'SE', 1)
                     ,('Tocantins', 'TO', 1);

INSERT INTO dbos.Cities(Name_City, DDD, ID_State)
                       VALUES('São Paulo', '11', 25)
                             ,('Tupã', '14', 25)
                             ,('Rio de Janeiro', '21', 19)
                             ,('Santa Catarina', '47', 24);

INSERT INTO Users(Name_User, Username, PasswordUser, DT_Birth, National_Identifier, Type_Person, ID_Type_Access, Active_User, DH_Inclusion, DH_Change)
VALUES ('Administrador', 'adm', '079200673e6c8824cbed13ff04671ee323740325', '2000-01-01', NULL, NULL, 1, TRUE, NOW(), NULL)
      ,('Empresa', 'empresa', '079200673e6c8824cbed13ff04671ee323740325', '2000-01-01', '55180082000195', 'J', 2, TRUE, NOW(), NULL)
      ,('Funcionario', 'func', '079200673e6c8824cbed13ff04671ee323740325', '2000-01-01', '12345678907', 'F', 3, TRUE, NOW(), NULL)
      ,('Consumidor Teste', 'consumidor', '079200673e6c8824cbed13ff04671ee323740325', '2000-01-01', '12345678909', 'F', 4, TRUE, NOW(), NULL);

INSERT INTO Adresses(Street, District, Number_Street, CD_Postal, Complement, ID_City, ID_User)
VALUES ('Rua Brasil', 'Centro', '1010', 17602180, 'Barracão', 2, 2)
      ,('Rua João Capioto', 'Coab', '1110', 17602180, 'Casa', 2, 3)
      ,('Rua Irene de camargo', 'Parque Ipiranga', '101', 17602180, 'Casa', 2, 4);

INSERT INTO Phones (Number_Phone, ID_City, ID_User)
VALUES ('14997305051', 2, 2)
      ,('14997305052', 3, 3)
      ,('14997305053', 1, 4);

INSERT INTO Types_Services(Name_Type_Service, price)
VALUE ('HIDRÁULICA', 150.00)
     ,('ELÉTRICA', 100.00)
     ,('MECÂNICA', 120.00);

INSERT INTO Types_Equipments(Name_Type_Equipment)
VALUES ('Moto')
      ,('Carro')
      ,('Caminhão')
      ,('Trator')
      ,('Colhedora')
      ,('Implemento');

INSERT INTO Brands(Name_Brand)
VALUES ('BMW')
      ,('John Deere')
      ,('Chevrolet')
      ,('Honda')
      ,('Toyota')
      ,('Jaguar');

/*
INSERT INTO Equipments(Nome_Equipamento, NO_Frota, Active_User, ID_Tipo_Equipamento, ID_Setor_Equipamento, DH_Inclusion, DH_Change)
VALUES ('ONIBUS - VOLARE',                                 1019, TRUE, 1, 1, NOW(), NULL)
      ,('SAVEIRO ROBUST COLHEITA',                         1027, TRUE, 2, 1, NOW(), NULL)
      ,('TRATOR JD 6180J',                                 2011, TRUE, 3, 1, NOW(), NULL)
      ,('TRATOR JD 6180J',                                 2012, TRUE, 3, 1, NOW(), NULL)
      ,('TRATOR JD 7195J',                                 2013, TRUE, 3, 1, NOW(), NULL)
      ,('TRATOR JD 7195J',                                 2014, TRUE, 3, 1, NOW(), NULL)
      ,('TRATOR JD 6180J',                                 2015, TRUE, 3, 1, NOW(), NULL)
      ,('TRATOR JD 7195J',                                 2016, TRUE, 3, 1, NOW(), NULL)
      ,('TRATOR JD 6190J',                                 2018, TRUE, 3, 1, NOW(), NULL)
      ,('TRATOR JD 6190J',                                 2019, TRUE, 3, 1, NOW(), NULL)
      ,('TRATOR JD 6190J',                                 2025, TRUE, 3, 1, NOW(), NULL)
      ,('PIPA COLHEITA',                                   3008, TRUE, 4, 1, NOW(), NULL)
      ,('COMBOIO',                                         3009, TRUE, 4, 1, NOW(), NULL)
      ,('OFICINA COLHEITA',                                3010, TRUE, 4, 1, NOW(), NULL)
      ,('OFICINA FAZENDA',                                 3011, TRUE, 4, 2, NOW(), NULL)
      ,('PIPA COLHEITA',                                   3012, TRUE, 4, 1, NOW(), NULL)
      ,('COLHEDORA  CH670',                                4004, TRUE, 5, 1, NOW(), NULL)
      ,('COLHEDORA  CH670',                                4005, TRUE, 5, 1, NOW(), NULL)
      ,('COLHEDORA  CH670',                                4006, TRUE, 5, 1, NOW(), NULL)
      ,('COLHEDORA  CH670',                                4007, TRUE, 5, 1, NOW(), NULL)
      ,('COLHEDORA CH950',                                 4008, TRUE, 5, 1, NOW(), NULL)
      ,('AREA DE VIVENCIA 12 LUGARES N° 5051',             5051, TRUE, 6, 1, NOW(), NULL)
      ,('TRANSBORDO 5073',                                 5073, TRUE, 6, 1, NOW(), NULL)
      ,('TRANSBORDO 5076',                                 5076, TRUE, 6, 1, NOW(), NULL)
      ,('TRANSBORDO 5077',                                 5077, TRUE, 6, 1, NOW(), NULL)
      ,('TRANSBORDO 5078',                                 5078, TRUE, 6, 1, NOW(), NULL)
      ,('TRANSBORDO 5079',                                 5079, TRUE, 6, 1, NOW(), NULL)
      ,('TRANSBORDO 5080',                                 5080, TRUE, 6, 1, NOW(), NULL)
      ,('TRANSBORDO 5081',                                 5081, TRUE, 6, 1, NOW(), NULL)
      ,('TRANSBORDO 5082',                                 5082, TRUE, 6, 1, NOW(), NULL)
      ,('TRANSBORDO 5083',                                 5083, TRUE, 6, 1, NOW(), NULL)
      ,('CARRETA TRANSBORDO ATA 12000 SC N°5086',          5086, TRUE, 6, 1, NOW(), NULL)
      ,('CARRETA TRANSBORDO TESTON 14000 MCT N°5087',      5087, TRUE, 6, 1, NOW(), NULL)
      ,('CARRETA TRANSBORDO TESTON  GIGANTE 22000 N°5088', 5088, TRUE, 6, 1, NOW(), NULL)
      ,('TRATOR JD 6190J',                                 2029, TRUE, 3, 1, NOW(), NULL)
      ,('F350',                                            3005, TRUE, 4, 1, NOW(), NULL)
      ,('AVULSO',                                          1010, TRUE, 7, 1, NOW(), NULL);*/
/*
INSERT INTO Services_Orders(DH_Abertura        
						   ,DH_Fechado         
						   ,Detailing          
						   ,Peca_Usadas         
						   ,Observacao          
						   ,Solution             
						   ,Number_Condition           
						   ,ID_Equipment      
						   ,ID_User_Customer 
						   ,ID_User_Employe 
					       ,ID_Type_Service)
VALUES(NOW(), null, 'Teste Detailing', 'Rolamento', 'Desgastada', 'Trocar', 2007.15, 3, 3, 2, 5);*/