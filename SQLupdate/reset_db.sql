DROP TABLE IF EXISTS characters;

CREATE TABLE characters (
    c_id INTEGER PRIMARY KEY,
    c_name TEXT NOT NULL,
    c_wit INTEGER, 
    c_strength INTEGER, 
    c_attack INTEGER, 
    c_defense INTEGER,
    c_magic INTEGER
);

DROP TABLE IF EXISTS equipment; 

CREATE TABLE equipment (
    e_id INTEGER PRIMARY KEY,
    e_name TEXT NOT NULL
);

DROP TABLE IF EXISTS assignedEquipment; 

CREATE TABLE assignedEquipment (
    c_id INTEGER,
    e_id INTEGER
);

DROP TABLE IF EXISTS quests; 

CREATE TABLE quests (
    q_id INTEGER PRIMARY KEY,
    q_name TEXT NOT NULL
);

DROP TABLE IF EXISTS assignedQuests; 

CREATE TABLE assignedQuests (
    c_id INTEGER,
    q_id INTEGER
)

