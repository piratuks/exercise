INSERT INTO DEVELOPER (NAME) VALUES ('Jack');
INSERT INTO DEVELOPER (NAME) VALUES ('John');
INSERT INTO DEVELOPER (NAME) VALUES ('Jim');
INSERT INTO DEVELOPER (NAME) VALUES ('Anton');
INSERT INTO DEVELOPER (NAME) VALUES ('Remigijus');
INSERT INTO DEVELOPER (NAME) VALUES ('Frank');
INSERT INTO DEVELOPER (NAME) VALUES ('Vagner');
INSERT INTO DEVELOPER (NAME) VALUES ('Dimitrij');
INSERT INTO DEVELOPER (NAME) VALUES ('Joshua');
INSERT INTO DEVELOPER (NAME) VALUES ('Jin');

INSERT INTO Status (STATUS) VALUES ('New');
INSERT INTO Status (STATUS) VALUES ('Estimated');
INSERT INTO Status (STATUS) VALUES ('Completed');
INSERT INTO Status (STATUS) VALUES ('Verified');
INSERT INTO Status (STATUS) VALUES ('Resolved');

INSERT INTO Priority (PRIORITY) VALUES ('Critical');
INSERT INTO Priority (PRIORITY) VALUES ('Major');
INSERT INTO Priority (PRIORITY) VALUES ('Minor');

INSERT INTO Type (TYPE) VALUES ('Story');
INSERT INTO Type (TYPE) VALUES ('Bug');

INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, PRIORITY) 
VALUES ('Test Issue 1', 'This is just a one of the test issues. The issue is 1', (select now() at time zone 'UTC'), 'Bug', 'New', 'Critical');
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, PRIORITY) 
VALUES ('Test Issue 2', 'This is just a one of the test issues. The issue is 2', (select now() at time zone 'UTC'), 'Bug', 'Verified', 'Major');
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, PRIORITY) 
VALUES ('Test Issue 3', 'This is just a one of the test issues. The issue is 3', (select now() at time zone 'UTC'), 'Bug', 'Resolved', 'Minor');
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, PRIORITY) 
VALUES ('Test Issue 4', 'This is just a one of the test issues. The issue is 4', (select now() at time zone 'UTC'), 'Bug', 'New', 'Minor');
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, PRIORITY) 
VALUES ('Test Issue 5', 'This is just a one of the test issues. The issue is 5', (select now() at time zone 'UTC'), 'Bug', 'Verified', 'Major');
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, PRIORITY) 
VALUES ('Test Issue 6', 'This is just a one of the test issues. The issue is 6', (select now() at time zone 'UTC'), 'Bug', 'Resolved', 'Critical');
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, PRIORITY) 
VALUES ('Test Issue 7', 'This is just a one of the test issues. The issue is 7', (select now() at time zone 'UTC'), 'Bug', 'New', 'Minor');
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, PRIORITY) 
VALUES ('Test Issue 8', 'This is just a one of the test issues. The issue is 8', (select now() at time zone 'UTC'), 'Bug', 'Verified', 'Critical');
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, PRIORITY) 
VALUES ('Test Issue 9', 'This is just a one of the test issues. The issue is 9', (select now() at time zone 'UTC'), 'Bug', 'Resolved', 'Major');
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, PRIORITY) 
VALUES ('Test Issue 10', 'This is just a one of the test issues. The issue is 10', (select now() at time zone 'UTC'), 'Bug', 'Resolved', 'Major');
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 11', 'This is just a one of the test issues. The issue is 11', (select now() at time zone 'UTC'), 'Story', 'New', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 12', 'This is just a one of the test issues. The issue is 12', (select now() at time zone 'UTC'), 'Story', 'Verified', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 13', 'This is just a one of the test issues. The issue is 13', (select now() at time zone 'UTC'), 'Story', 'Resolved', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 14', 'This is just a one of the test issues. The issue is 14', (select now() at time zone 'UTC'), 'Story', 'New', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 15', 'This is just a one of the test issues. The issue is 15', (select now() at time zone 'UTC'), 'Story', 'Verified', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 16', 'This is just a one of the test issues. The issue is 16', (select now() at time zone 'UTC'), 'Story', 'Resolved', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 17', 'This is just a one of the test issues. The issue is 17', (select now() at time zone 'UTC'), 'Story', 'New', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 18', 'This is just a one of the test issues. The issue is 18', (select now() at time zone 'UTC'), 'Story', 'Verified', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 19', 'This is just a one of the test issues. The issue is 19', (select now() at time zone 'UTC'), 'Story', 'Resolved', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 20', 'This is just a one of the test issues. The issue is 20', (select now() at time zone 'UTC'), 'Story', 'Resolved', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 21', 'This is just a one of the test issues. The issue is 21', (select now() at time zone 'UTC'), 'Story', 'New', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 22', 'This is just a one of the test issues. The issue is 22', (select now() at time zone 'UTC'), 'Story', 'Verified', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 23', 'This is just a one of the test issues. The issue is 23', (select now() at time zone 'UTC'), 'Story', 'Resolved', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 24', 'This is just a one of the test issues. The issue is 24', (select now() at time zone 'UTC'), 'Story', 'New', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 25', 'This is just a one of the test issues. The issue is 25', (select now() at time zone 'UTC'), 'Story', 'Verified', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 26', 'This is just a one of the test issues. The issue is 26', (select now() at time zone 'UTC'), 'Story', 'Resolved', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 27', 'This is just a one of the test issues. The issue is 27', (select now() at time zone 'UTC'), 'Story', 'New', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 28', 'This is just a one of the test issues. The issue is 28', (select now() at time zone 'UTC'), 'Story', 'Verified', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 29', 'This is just a one of the test issues. The issue is 29', (select now() at time zone 'UTC'), 'Story', 'Resolved', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 30', 'This is just a one of the test issues. The issue is 30', (select now() at time zone 'UTC'), 'Story', 'Resolved', 1);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 31', 'This is just a one of the test issues. The issue is 31', (select now() at time zone 'UTC'), 'Story', 'New', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 32', 'This is just a one of the test issues. The issue is 32', (select now() at time zone 'UTC'), 'Story', 'Verified', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 33', 'This is just a one of the test issues. The issue is 33', (select now() at time zone 'UTC'), 'Story', 'Resolved', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 34', 'This is just a one of the test issues. The issue is 34', (select now() at time zone 'UTC'), 'Story', 'New', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 35', 'This is just a one of the test issues. The issue is 35', (select now() at time zone 'UTC'), 'Story', 'Verified', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 36', 'This is just a one of the test issues. The issue is 36', (select now() at time zone 'UTC'), 'Story', 'Resolved', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 37', 'This is just a one of the test issues. The issue is 37', (select now() at time zone 'UTC'), 'Story', 'New', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 38', 'This is just a one of the test issues. The issue is 38', (select now() at time zone 'UTC'), 'Story', 'Verified', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 39', 'This is just a one of the test issues. The issue is 39', (select now() at time zone 'UTC'), 'Story', 'Resolved', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 40', 'This is just a one of the test issues. The issue is 40', (select now() at time zone 'UTC'), 'Story', 'Resolved', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 41', 'This is just a one of the test issues. The issue is 51', (select now() at time zone 'UTC'), 'Story', 'New', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 42', 'This is just a one of the test issues. The issue is 52', (select now() at time zone 'UTC'), 'Story', 'Verified', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 43', 'This is just a one of the test issues. The issue is 53', (select now() at time zone 'UTC'), 'Story', 'Resolved', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 44', 'This is just a one of the test issues. The issue is 54', (select now() at time zone 'UTC'), 'Story', 'New', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 45', 'This is just a one of the test issues. The issue is 55', (select now() at time zone 'UTC'), 'Story', 'Verified', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 46', 'This is just a one of the test issues. The issue is 56', (select now() at time zone 'UTC'), 'Story', 'Resolved', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 47', 'This is just a one of the test issues. The issue is 57', (select now() at time zone 'UTC'), 'Story', 'New', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 48', 'This is just a one of the test issues. The issue is 58', (select now() at time zone 'UTC'), 'Story', 'Verified', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 49', 'This is just a one of the test issues. The issue is 59', (select now() at time zone 'UTC'), 'Story', 'Resolved', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 50', 'This is just a one of the test issues. The issue is 60', (select now() at time zone 'UTC'), 'Story', 'Resolved', 2);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 61', 'This is just a one of the test issues. The issue is 61', (select now() at time zone 'UTC'), 'Story', 'New', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 62', 'This is just a one of the test issues. The issue is 62', (select now() at time zone 'UTC'), 'Story', 'Verified', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 63', 'This is just a one of the test issues. The issue is 63', (select now() at time zone 'UTC'), 'Story', 'Resolved', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 64', 'This is just a one of the test issues. The issue is 64', (select now() at time zone 'UTC'), 'Story', 'New', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 65', 'This is just a one of the test issues. The issue is 65', (select now() at time zone 'UTC'), 'Story', 'Verified', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 66', 'This is just a one of the test issues. The issue is 66', (select now() at time zone 'UTC'), 'Story', 'Resolved', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 67', 'This is just a one of the test issues. The issue is 67', (select now() at time zone 'UTC'), 'Story', 'New', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 68', 'This is just a one of the test issues. The issue is 68', (select now() at time zone 'UTC'), 'Story', 'Verified', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 69', 'This is just a one of the test issues. The issue is 69', (select now() at time zone 'UTC'), 'Story', 'Resolved', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 70', 'This is just a one of the test issues. The issue is 70', (select now() at time zone 'UTC'), 'Story', 'Resolved', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 71', 'This is just a one of the test issues. The issue is 71', (select now() at time zone 'UTC'), 'Story', 'New', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 72', 'This is just a one of the test issues. The issue is 72', (select now() at time zone 'UTC'), 'Story', 'Verified', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 73', 'This is just a one of the test issues. The issue is 73', (select now() at time zone 'UTC'), 'Story', 'Resolved', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 74', 'This is just a one of the test issues. The issue is 74', (select now() at time zone 'UTC'), 'Story', 'New', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 75', 'This is just a one of the test issues. The issue is 75', (select now() at time zone 'UTC'), 'Story', 'Verified', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 76', 'This is just a one of the test issues. The issue is 76', (select now() at time zone 'UTC'), 'Story', 'Resolved', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 77', 'This is just a one of the test issues. The issue is 77', (select now() at time zone 'UTC'), 'Story', 'New', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 78', 'This is just a one of the test issues. The issue is 78', (select now() at time zone 'UTC'), 'Story', 'Verified', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 79', 'This is just a one of the test issues. The issue is 79', (select now() at time zone 'UTC'), 'Story', 'Resolved', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 80', 'This is just a one of the test issues. The issue is 80', (select now() at time zone 'UTC'), 'Story', 'Resolved', 3);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 81', 'This is just a one of the test issues. The issue is 81', (select now() at time zone 'UTC'), 'Story', 'New', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 82', 'This is just a one of the test issues. The issue is 82', (select now() at time zone 'UTC'), 'Story', 'Verified', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 83', 'This is just a one of the test issues. The issue is 83', (select now() at time zone 'UTC'), 'Story', 'Resolved', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 84', 'This is just a one of the test issues. The issue is 84', (select now() at time zone 'UTC'), 'Story', 'New', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 85', 'This is just a one of the test issues. The issue is 85', (select now() at time zone 'UTC'), 'Story', 'Verified', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 86', 'This is just a one of the test issues. The issue is 86', (select now() at time zone 'UTC'), 'Story', 'Resolved', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 87', 'This is just a one of the test issues. The issue is 87', (select now() at time zone 'UTC'), 'Story', 'New', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 88', 'This is just a one of the test issues. The issue is 88', (select now() at time zone 'UTC'), 'Story', 'Verified', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 89', 'This is just a one of the test issues. The issue is 89', (select now() at time zone 'UTC'), 'Story', 'Resolved', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 90', 'This is just a one of the test issues. The issue is 90', (select now() at time zone 'UTC'), 'Story', 'Resolved', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 91', 'This is just a one of the test issues. The issue is 91', (select now() at time zone 'UTC'), 'Story', 'New', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 92', 'This is just a one of the test issues. The issue is 92', (select now() at time zone 'UTC'), 'Story', 'Verified', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 93', 'This is just a one of the test issues. The issue is 93', (select now() at time zone 'UTC'), 'Story', 'Resolved', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 94', 'This is just a one of the test issues. The issue is 94', (select now() at time zone 'UTC'), 'Story', 'New', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 95', 'This is just a one of the test issues. The issue is 95', (select now() at time zone 'UTC'), 'Story', 'Verified', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 96', 'This is just a one of the test issues. The issue is 96', (select now() at time zone 'UTC'), 'Story', 'Resolved', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 97', 'This is just a one of the test issues. The issue is 97', (select now() at time zone 'UTC'), 'Story', 'New', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 98', 'This is just a one of the test issues. The issue is 98', (select now() at time zone 'UTC'), 'Story', 'Verified', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 99', 'This is just a one of the test issues. The issue is 99', (select now() at time zone 'UTC'), 'Story', 'Resolved', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 100', 'This is just a one of the test issues. The issue is 100', (select now() at time zone 'UTC'), 'Story', 'Resolved', 5);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 101', 'This is just a one of the test issues. The issue is 101', (select now() at time zone 'UTC'), 'Story', 'New', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 102', 'This is just a one of the test issues. The issue is 102', (select now() at time zone 'UTC'), 'Story', 'Verified', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 103', 'This is just a one of the test issues. The issue is 103', (select now() at time zone 'UTC'), 'Story', 'Resolved', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 104', 'This is just a one of the test issues. The issue is 104', (select now() at time zone 'UTC'), 'Story', 'New', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 105', 'This is just a one of the test issues. The issue is 105', (select now() at time zone 'UTC'), 'Story', 'Verified', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 106', 'This is just a one of the test issues. The issue is 106', (select now() at time zone 'UTC'), 'Story', 'Resolved', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 107', 'This is just a one of the test issues. The issue is 107', (select now() at time zone 'UTC'), 'Story', 'New', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 108', 'This is just a one of the test issues. The issue is 108', (select now() at time zone 'UTC'), 'Story', 'Verified', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 109', 'This is just a one of the test issues. The issue is 109', (select now() at time zone 'UTC'), 'Story', 'Resolved', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 110', 'This is just a one of the test issues. The issue is 110', (select now() at time zone 'UTC'), 'Story', 'Resolved', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 111', 'This is just a one of the test issues. The issue is 111', (select now() at time zone 'UTC'), 'Story', 'New', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 112', 'This is just a one of the test issues. The issue is 112', (select now() at time zone 'UTC'), 'Story', 'Verified', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 113', 'This is just a one of the test issues. The issue is 113', (select now() at time zone 'UTC'), 'Story', 'Resolved', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 114', 'This is just a one of the test issues. The issue is 114', (select now() at time zone 'UTC'), 'Story', 'New', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT)
VALUES ('Test Issue 115', 'This is just a one of the test issues. The issue is 115', (select now() at time zone 'UTC'), 'Story', 'Verified', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 116', 'This is just a one of the test issues. The issue is 116', (select now() at time zone 'UTC'), 'Story', 'Resolved', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 117', 'This is just a one of the test issues. The issue is 117', (select now() at time zone 'UTC'), 'Story', 'New', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 118', 'This is just a one of the test issues. The issue is 118', (select now() at time zone 'UTC'), 'Story', 'Verified', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 119', 'This is just a one of the test issues. The issue is 119', (select now() at time zone 'UTC'), 'Story', 'Resolved', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 120', 'This is just a one of the test issues. The issue is 120', (select now() at time zone 'UTC'), 'Story', 'Resolved', 8);
INSERT INTO ISSUE (TITLE, DESCRIPTION, CREATED_AT, TYPE, STATUS, ESTIMATED_POINT) 
VALUES ('Test Issue 121', 'This is just a one of the test issues. The issue is 121', (select now() at time zone 'UTC'), 'Story', 'Resolved', 3);





