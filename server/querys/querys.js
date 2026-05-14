  import db from './../db.js';
  // bind values with an object and the norm :valuetobind ', {valuetobind: variablename}
  // check to see what happens if the connection to the database disapears.

  // check to see if mysql-rx purifies the info. otherwise purify.
  // auth routes
  // last_insert for mysql in mariaDB is it in it? can it be used in batch requests in begin and commit statements. prototype ver 2.
  // LAST_INSERT_ID() usable in mariadb in batch statements

  // site admin user table include pagination later for future admins in prototype 2.0

  const insertIntoAdminIndex = async (userId, priviledgeNumeral) => {
      const sql = 'insert into admin_index (userId, priviledges_numeral) values (:userId, :priviledgeNumeral)';
      return await db.query(sql, {userId: userId, priviledgeNumeral: priviledgeNumeral});
  }
  const selectFromAdminIndexViaUserId = async (userId) => {
      const sql = 'select * from admin_index where userId = :userId';
      return await db.query(sql, {userId});
  }
  const selectAllAdminIndexUsers = async () => {
      const sql =- 'select u.id as userId, a.id adminId, u.priviledges_numeral, u.email as email, u.username as username from  admin_index as a left join  users as u on u.id = a.userId';
      return await db.query(sql);
  }


  // average user table

  const insertIntoUsers = async (firstName, middleNames, surname, hashedPassword, email) => {
     const sql = `INSERT INTO users (first_name, middle_names, surname, password, email, created, failed_attempts) VALUES (:firstName, :middleNames, :surname, :hashedPassword, :email, now(),0)`;
      return await db.query(sql, {firstName: firstName, middleNames: middleNames, surname: surname, hashedPassword: hashedPassword, email: email});
  };

  const fetchUserViaEmail = async (email) => {
      const sql = `select * from users where email = :email`;
      return await db.query(sql, {email: email});

  };

  const updateFailedAttempts = async (id) => {
      const sql = `UPDATE users SET failed_attempts = failed_attempts+1, last_login = ${Date.now()} where id = :id`;
      return await db.query(sql, {id: id});
                          // // console.log(upResult);
  };

  const resetFailedAttempts = async (id) => {
      const sql = `UPDATE users SET failed_attempts = 0, last_login = now() where id = :id`;
      return await db.query(sql, {id: id});
  };

  // module route querys

  const insertIntoModuleIndexTable = async (keyName, genre, userId, keywords, description, moduleName, timestampDA, competitionId, author) => {
      const sql = `INSERT INTO module_index_table (key_name, genre, userId, keywords, description, module_name, timestamp_display_after, competition_id, show_module, takedown_notice, timestamp, pen_name) VALUES (:keyName, :genre, :userId, :keywords, :description, :moduleName, :timestampDA, :competitionId, 0, 0, now(), :author);`;
      return await db.query(sql, {keyName: keyName, genre: genre, userId: userId, keywords: keywords, description: description, moduleName: moduleName, timestampDA: timestampDA, competitionId: competitionId, author: author});
  };

  const selectFromModuleIndexTableViaUserIdAndLetter = async (userId, letter) => {
      const sql = "select * from module_index_table where userId = :userId and module_name like :letter";
      return await db.query(sql, {userId: userId, letter: letter+'%'});
  }

  const searchModuleIndexTableViaStringAndField = async (stringArr, field ,enabled, numberOfRows, offset) => {
      let newField = '';
      switch (field) {
          case 'keywords':
          newField = 'keywords';
          break;
          case 'author':
          newField = 'pen_name';
          break;
          case 'title':
          newField = 'module_name';
          break;
      }


      let result1;
      if (enabled) {
      const sql1 = `select count(*) as count from module_index_table where ${newField} like :field `
      placeObj = {};

      placeObj.place0 = '%' + stringArr[0] + '%';
      for (let i = 1; i < stringArr.length; i++) {
          sql1 += `and ${newField} like :place${[i]} `;
          placeObj['place'+i] = '%' + stringArr[i] + '%';
      }
      sql1 += `;`;

     result1 = await db.query(sql1, placeObj);


      }


      let sql = `select u.id as userid, m.id as moduleId, m.key_name as key_name, m.keywords as keywords, m.description as description, m.module_name as module_name, m.genre as genre, u.username as author from users u right join module_index_table m on u.id = m.userId `;
      sql += `where m.${newField} like :place0 `;
      for (let i = 1; i < stringArr.length; i++) {
          sql += `and m.${newField}  like :place${[i]}} `;
      }
      place.offset = offset;
      place.numberOfRows = numberOfRows;
      sql += `order by m.${newField} ${(newField === 'module_name' ? '' : ', m.module_name')} asc offset :offset rows fetch next :numberOfRows rows only`;
      sql += ';';

      let rows = await db.query(sql, placeObj);

      let resultFinal = {}
      resultFinal.count = result1[0].count;
      resultFinal.rows = rows;
      // // console.log(resultFinal);
      return resultFinal;

  };


  // bio routes
      const insertIntoBio = async (penName, description, userId) => {
          const sql = `insert into bio (pen_name, description, userId) VALUES (:penName, :description, :userId);`;
          return await db.query(sql, {penName: penName, description: description, userId: userId});
      };

      const selectBioViaId = async (userId) => {
          const sql = `select b.id as bioId, u.id as userId, b.pen_name as penName, b.description as description, u.username as username from bio as b left join users as u on b.userId = u.id where userId = :userId`;
          return await db.query(sql, {userId: userId});
      };

      const updateBioViaId = async (penName, description, id) => {
          const sql = `update bio set pen_name = :penName, description = :description where id = id`;
          return await db.query(sql, {description: description, penName: penName, id: id});
      };

      const deleteBio = async (id) => {
          const sql = 'delete from bio where id = :id';
          return await db.query(sql, {id: id});
      }

      // bio module invites
      const insertIntoInvites = async (authorId, invitedAuthor, moduleId) => {
          const sql = `insert into invites (author, author_to_invite, moduleId, accepted) values (:author, :invitedAuthor, :moduleId, 0)`;
          return await db.query(sql, {author: authorId, invitedAuthor: invitedAuthor, moduleId});
      };

      const selectInvites = async (userId) => {
          const sql = `select * from invites where author = :userId`;
          return await db.query(sql, {userId: userId});
      };

      const updateInvites = async (inviteId, accepted) => {
          const sql = `update invites set accepted = :accepted`;
          return await db.query(sql, {inviteId: inviteId, accepted: accepted});
      };

      const deleteInvite = async (inviteId) => {
          const sql = `delete from invites where id = :inviteId`;
          return await db.query(sql, {inviteId: inviteId});
      };

      // module admin invited author index

      const insertIntoModuleAdmins = async (moduleId, userId) => {
          const sql = `insert into module_admins (module_id, userId) values (:moduleId, :userId)`;
          return await db.query(sql, {moduleId: moduleId, userId: userId});
      };

      const deleteFromModuleAdmins = async (id) => {
          const sql = `delete from module_admins where id = :id`;
          return await db.query(sql, {id: id});
      };

      const selectFromModuleAdmins = async (moduleId) => {
          const sql = 'select * from module_admins where id = :moduleId';
          return await db.query(sql, {moduleId: moduleId});
      };

      //  admin_group_modules_index to hold modules for head author to splice where wanted
      const insertIntoAdminGroupModules = async (userId, primaryAuthor, moduleName, messageForumId, keyName, penName, joinedModuleId) => {
          const sql = 'insert into admin_group_modules_index (userId, primary_author, module_name, message_forum_id, key_name, contributor_pen_name, created, timestamp, joined_module_id) values (:userId, :primaryAuthor, :moduleName, :messageForumId, :keyName, :penName, now(), now(), joinedModuleId)'
          return await db.query(sql, {userId: userId, primaryAuthor: primaryAuthor, moduleName: moduleName, messageForumId: messageForumId, keyName: keyName, penName: penName, joinedModuleId: joinedModuleId});
      };

      const deleteFromAdminGroupModules = async (id) => {
          const sql = 'delete from admin_group_modules_index where id = :id';
          return await db.query(sql, {id: id});
      } ;

      const selectAdminGroupModuleViaId = async (id) => {
          const sql = 'select * from admin_group_modules_index where id = :id';
          return await db.query(sql, {id: id});
      };

      const selectAdminGroupModuleViaKey = async (key) => {
          const sql = 'select * from admin_group_modules_index where key = :key';
          return await db.query(sql, {key: key})
      };

      const updateAdminGroupModule =  async (adminModuleId, moduleName, messageForumId, keyName, penName, joinedModuleId) => {
          const sql = 'update admin_group_modules_index set module_name = :moduleName, message_forum_id = :messageFormumId, key_name = :keyName, contributor_pen_name = :penName, timestamp = now(), joined_module_id = :joinedModuleId';
          return await db.query(sql, {adminModuleId: adminModuleId, moduleName: moduleName, messageForumId: messageForumId, keyName: keyName, penName: penName, joinedModuleId: joinedModuleId});
      }



          // forum for speaking to other admins about project


      const insertIntoForum = async (adminModuleId, comment, commenterId) => {
          const sql = 'insert into module_admin_forum (admin_module_id, comment, commenter_id, up, down) values (:adminModuleId, :comment, :commenterId, 0, 0)';
          return await db.query(sql, {adminModuleId: adminModuleId, comment: comment, commenterId: commenterId});
      };

      const updateForumComment = async (id, comment) => {
          const sql = 'update module_admin_forum set comment = :comment where id = :id';
          return await db.query(sql, {id: id, comment: comment});
      };

      const deleteComment = async (id) => {
          const sql = 'delete from module_admin_forum where id - :id';
          return await db.query(sql, {id: id});
      };
          // TO BE UPDATED TO PAGINATION WHEN THE PAGE IS MADE

      const selectComments = async (moduleId) => {
          const sql = 'select * from module_admin_forum where admin_module_id = :moduleId';
          return await db.query(sql, {moduleId: moduleId});
      };


      // reviews on modules
      const insertReview = async (string, userId, star) => {
          const sql = 'insert into review_table (string, uid, star, timestamp) values (:string, userId, star, now())';
          return await db.query(sql, {string: string, userId: userId, star: star});
      };

      const deleteReviewPastNuTen = async (moduleId) => {
          const sql = 'DELETE FROM review_table WHERE module_id = :moduleId id IN ( SELECT id FROM (SELECT id FROM review_table ORDER BY id DESC limit 1000 OFFSET 10) AS x);';
          return await db.query(sql, {moduleId: moduleId});
      };

      const selectReviews = async (moduleId) => {
          const sql = 'select * from review_table where module_id = :moduleId';
          return await db.query(sql, {moduleId: moduleId});
      }
      // votes

      const insertVote = async (moduleId) => {
          const sql = 'insert into votes (moduleId, up, down, timestamp) values (:moduleId, 0, 0, now())'
          return await db.query(sql, {moduleId: moduleId});
      };
      const updateUpVote = async (moduleId) => {
          const sql = 'update votes set up = up + 1 where moduleId = :moduleId';
          return await db.query(sql, {moduleId: moduleId});
      };
      const updateDownVote = async (moduleId) => {
          const sql = 'update votes set down = down + 1 where moduleId = :moduleId';
          return await db.query(sql, {moduleId: moduleId});
      };
      const selectVotes = async (moduleId) => {
          const sql = 'select * from votes where moduleId = :moduleId';
          return await db.query(sql, {moduleId: moduleId});
      };

      const determineHighestVoteOnComp = async ( competitionId) => {
          const sql = 'select (v.up - v.down) as score, v.up as up, v.down as down, m.pen_name as pen_name, m.module_name as module_name, m.key_name as key_name, m.userId as userId, m.description as description, m.genre as genre, m.competition_id as competition_id from votes as v right join module_index_table as m on v.module_id = m.id where  m.competition_id = competitionId order by score desc limit 5 offset 5';
          return await db.query(sql, { competitionId});
      };


      // competition index

      const insertCompetition = async (startDate, endDate, description, imageLocation, title, reward) => {
          const sql = 'insert into competition_index (start_date, end_date, description, image_location, title, reward) values (:startDate, :endDate, :description, :imageLocation, :title, :reward)';
          return await db.query(sql, {startDate: startDate, endDate: endDate, description: description, imageLocation: imageLocation, title: title, reward: reward});
      }

      const deleteCompetition = async (id) => {
          const sql = 'delete from competition_index where id = :id';
          return await db.query(sql, {id: id});
      }
      const selectCompetitions = async () => {
          const sql = 'select * from competitions_index';
          return await db.query(sql);
      }
      const updateCompetition = async (startDate, endDate, description, imageLocation, title, reward) => {
          const sql = 'update competitions_indes set start_date = : startDate, end_date = :endDate, description = :description, image_location = :imageLocation, title = :title, reward = :reward';
          return await db.query(sql, {startDate: startDate, endDate: endDate, description: description, imageLocation: imageLocation, title: title, reward: reward});
      }
      // reports on modules

      const insertReportType = async (type, message) => {
          const sql = 'insert into report_type (type, message) values (:type, :message)';
          return await db.query(sql, {type: type, message: message});
      }
      const selectReportTypeRows = async () => {
          const sql = 'select * from report_type';
          return await db.query(sql);
      }

      const insertReport = async (moduleId, type, reason) =>  {
          const sql = 'insert into reports (module_id, type, reason) values (:moduleId, :type, :reason)';
          return await db.query(sql, {moduleId: moduleId, type: type, reason: reason});
      }

      const countReports = async (moduleId) => {
          const sql = 'select count(*) reports where module_id = :moduleId';
          return await db.query(sql, {moduleId: moduleId});

      }

      const selectReports = async (moduleId) => {
          const sql = 'select * from reports where module_id = :moduleId';
          return await db.query(sql, {moduleId: moduleId});
      }


      // site setttings

      const updateSiteSettingsForumSwitch = async (userId, sw) => {
          const sql = 'update ssettings set forum_switch = :sw, userId = :userId';
          return await db.query(sql, {userId: userId, switch: sw})
      }

      const updateSiteSettingsLoginSwitch = async (userId, sw) => {
          const sql = 'update ssettings set login_switch = :sw, userId = :userId';
          return await db.query(sql, {userId: userId, switch: sw})
      }
      const selectSiteSettings = async () => {
          const sql = 'select * from ssettings';
          return await db.query(sql);
      }



      // for new application
      const insertSubject = async (object) => {
          let {numberOfQuestions, numberOfRemoval, introduction, creator, subject_information, link} = object;
          numberOfQuestions = numberOfQuestions * 1;
          numberOfRemoval = numberOfRemoval * 1;
          const sql = `insert into subject (name, introduction, creator, timestamp, last_altered_by, visible, links, number_of_questions, number_of_removal) values (:name, :introduction, :creator, now(), :creator2, 1, :links, ${numberOfQuestions}, ${numberOfRemoval})`;
          return await db.query(sql, {name: subject_information, introduction: introduction, creator: creator, creator2: creator, links: link})

      }

      const getLastPositionOfQuestionIds = async (subjectId) => {
          const sql = `select max(question-number) from question_id where subject_id = :subjectId`;
          return await db.query(sql, {subjectId: subjectId});
      }

      const insertQuestionIds = async (object) => {
          const {subject, name, description, id, position} = object;
          const sql = `insert into question_id (subject_id, name, info, creator, timestamp, visible, position) values (:subject, :name, :info, :creator, now(), 0, :position)`;
          return await db.query(sql, {subject: subject, name: name, info: description, creator: id, position: position})



      }

      const getCountOfQuestionIds = async (subjectId) => {
          const sql = `select count(*) as count from question_id where subject_id = :subjectId`;
          return await db.query(sql, {subjectId: subjectId});
      }

      const aquireQuestionIds = async (subjectId, offset, limit) => {

          const sql = `select q.question_id, u.email as creator, u2.email as alterer, q.name, q.info, q.timestamp, q.visible, q.position  from users as u right join question_id as q on u.id = q.creator left join users as u2 on u2.id = q.last_altered_by where subject_id like :subjectId order by position, question_id asc limit :limit offset :offset`;
          return await db.query(sql, {subjectId: subjectId, limit: Number(limit), offset: Number(offset)});
      }
    const aquireQuestionId = async (questionId) => {

          const sql = `select q.question_id, u.email as creator, u2.email as alterer, q.name, q.info, q.timestamp, q.visible, q.position  from users as u right join question_id as q on u.id = q.creator left join users as u2 on u2.id = q.last_altered_by where question_id = :questionId`;
          return await db.query(sql, {questionId: questionId});
      }
      const insertQuestionInformation = async (object) => {
          const {questionInformation, hint0, hint1, hint2, choice0, answer0, choice1, answer1, choice2, answer2, choice3, answer3, choice4, answer4, choice5, answer5, correct, id, questionId, subjectId, position } = object;
          // // console.log(object);
          let sql = `insert into question_information (subject_id, question_id, question_information, choice0, choice1, choice2, choice3, choice4, choice5, hint0, hint1, hint2, reply0, reply1, reply2, reply3, reply4, reply5, correct_choice,  creator, timestamp, last_altered_by, visible) values (:subjectId, :questionId, :questionInformation, :choice0, :choice1, :choice2, :choice3, :choice4, :choice5, :hint0, :hint1, :hint2, :reply0, :reply1, :reply2, :reply3, :reply4, :reply5, :correct_choice,  :creator, now(), :last_altered_by, 0) ; `;

          let sql1 = `insert into qIdiId (subject_id, question_id, information_id, position) values (:subjectId, :questionId, :informationId, :position) ; `;
          let query1, query2;
          try {
              query1 = await db.query(sql, { subjectId: subjectId, questionId: questionId, questionInformation: questionInformation, choice0: choice0, choice1: choice1, choice2: choice2, choice3: choice3, choice4: choice4, choice5: choice5, hint0: hint0, hint1: hint1, hint2: hint2, reply0: answer0, reply1: answer1, reply2: answer2, reply3: answer3, reply4: answer4, reply5: answer5, correct_choice: correct,  creator: id, last_altered_by: id});
              query2 = await db.query(sql1, {position: position, subjectId: subjectId, informationId: query1.insertId, questionId: questionId});
                  } catch  {
              // // console.log('failed');
                  }
          return query2;
      }
      // consider the workings of here

      const selectSubjectViaLetterPagination = async (limit, offset, letter) => {

          // // console.log(offset);
          let sql = `select name, subject_id from subject where name COLLATE utf8mb4_general_ci like :letter order by name asc limit :limit offset :offset; `;
           sql += `select count(*) from subject where name COLLATE utf8mb4_general_ci like :letter2;`;
          // // console.log(sql);
          return await db.query(sql, {limit: Number(limit), offset: Number(offset), letter2: letter+'%', letter: letter+'%'});
          }
      // above to make case insensitive
      const selectAlphaSubjectViaPagination = async (limit, offset) => {
      limit = Number(limit) *1;
          offset = Number(offset) *1;
          const sql = `select name, subject_id from subject order by name asc limit ${limit} offset ${offset}`;

          return db.query(sql, {limit: limit, offset: offset});

      }

      const countOfSubjectsAndInitEntries = async (limit) => {

          const sql0 = `select count(*) as count from subject; `;
          const sql1 = `select name, subject_id from subject order by name asc limit ${limit} offset 0; `;

          return await db.query(sql1+sql0)

      }


      const countOfSubjectViaLetterAndInitEntries = async (letter, limit) => {
          limit = limit * 1;
          let sql0 = `select count(*) as count from subject where name like :letter order by name asc; `;
          let sql1 = `select name, subject_id from subject where  name COLLATE utf8mb4_general_ci like :letter  order by name asc  limit ${limit} offset 0; `;

          return await db.query(sql1 + sql0, {letter: letter + '%'});


      }
      const incrementVersionViaSubjectId = async (id) => {
          const sql = `update subject set version = version+1 where subject_id = :id`;
          return await db.query(sql, {id: id});

      }

   const selectSubjectViaIdWithFiles = async (id) => {
          id = id * 1;
          const sql = `select * from (select s.version as version, s.subject_id as sub_id, s.last_altered_by, u.email as creator,  s.apendix, s.changes, s.introduction, s.links, s.name,
  s.subject_id, s.number_of_removal, s.number_of_questions, s.timestamp, s.video_files, s.visible from users u right join subject  s on u.id = s.creator
   left join users u2 on s.last_altered_by = u2.id) as t left join files f on t.sub_id = f.subject_id where t.subject_id = ${id} order by f.position;`;
          return await db.query(sql);

      }
      const selectSubjectViaId = async (id) => {
          id = id * 1;
          const sql = `select u.email as creator, s.version as version, u2.email as last_altered_by, s.apendix, s.changes, s.introduction, s.links, s.name, s.subject_id, s.number_of_removal, s.number_of_questions, s.timestamp, s.video_files, s.visible from users u right join subject  s on u.id = s.creator left join users u2 on s.last_altered_by = u2.id  where subject_id = ${id}`;
          return await db.query(sql);

      }
      const updateSubjectViaId = async (object2) => {


          let {subjectId, numberOfQuestions, numberOfRemoval, introduction, creator, name, link, changes} = object2;
          // // console.log(object2);


          numberOfQuestions = numberOfQuestions *1;
          numberOfRemoval = numberOfRemoval *1;
          creator = creator *1;
          const sql = `update subject set name = :name, introduction = :introduction, number_of_questions = ${numberOfQuestions}, number_of_removal = ${numberOfRemoval}, last_altered_by = ${creator}, links = :link, changes = :changes where subject_id = :subjectId`;
  // // console.log(name);
          return await db.query(sql, {subjectId: subjectId, introduction: introduction, name: name, link: link, changes: changes});


      }

      const updateQuestionIds = async (object1) => {
          const {questionId, object} = object1;
          const {changes, creator, name, info, position} = object;
          // // console.log(questionId, object, info);
          let sql = 'update question_id set changes = :changes, last_altered_by = :creator, name = :name, position = :position where question_id = :questionId;';
          sql += ' update qIdiId set position = :position2 where question_id = :questionId2 ;';
          // // console.log(sql);
          return await db.query(sql, {questionId2: questionId, questionId: questionId, changes: changes, creator: creator, name: name, info: info, position: position, position2: position});

      }
      const selectIndividualQuestionIds = async (id) => {
          const sql = `select * from question_id where question_id = :id`;
          // // console.log(id);
          return await db.query(sql, {id: id});
      }

      const selectQuestionInformationViaQuestionIdPagination = async (questionId, limit, offset) => {

          const sql = `select * from question_information where question_id = :questionId order by 
          information_id asc limit :limit offset :offset`;
          return await db.query(sql, {limit: Number(limit), offset: Number(offset), questionId});

      }

      const selectIndividualQuesitonInformation = async (informationId) => {

          const sql = `select * from question_information where information_id = :informationId`;
          return await db.query(sql, {informationId: informationId});

      }

      const selectQuesitonInformationIdsViaSubjectId = async (subjectId) => {

          const sql = `select information_id from question_information where subject_id = subjectId`;
          return await db.query(sql, {subjectId: subjectId});

      }

      const selectQuestionInformationCountViaQuesitonId = async (questionId) => {

          const sql = `select count(*) from question_information where question_id = :questionId`;
          return await db.query(sql, {questionId: questionId});
      }
      const updateQuestionInformation = async (object) => {
          let {informationId, choice0, choice1, choice2, choice3, choice4, choice5, reply0, reply1, reply2, reply3, reply4, reply5,
              correctChoice, hint0, hint1, hint2, hint3, creator, questionInformation} = object;
          const sql = `update question_information set choice0 = :choice0, choice1 = :choice1, choice2 = :choice2, choice3 = :choice3, choice4 = :choice4, choice5 = :choice5, reply0 = :reply0, reply1 = :reply1, reply2 = :reply2, reply3 = :reply3, reply4 = :reply4, reply5 = :reply5, correct_choice = :correctChoice, hint0 = :hint0, hint1 = :hint1, last_altered_by = :creator, question_information = :questionInformation where information_id = :informationId`;
          return await db.query(sql, {choice0: choice0, choice1: choice1, choice2: choice2, choice3: choice3, choice4: choice4, choice5: choice5, reply0: reply0, reply1: reply1, reply2: reply2, reply3: reply3, reply4: reply4, reply5: reply5,
              correctChoice: correctChoice, hint0: hint0, hint1: hint1, hint2: hint2, hint3: hint3, creator: creator, questionInformation: questionInformation, informationId: informationId});
      }
      const selectViaSearch = async (searchInfo, limit, offset, option2 = false) => {
              // // console.log(searchInfo, limit, offset, option2);
          searchInfo = searchInfo.replace('for', '');
          searchInfo = searchInfo.replace('and', '');
          searchInfo = searchInfo.replace('nor', '');
          searchInfo = searchInfo.replace('but', '');
          searchInfo = searchInfo.replace('yet', '');
          searchInfo = searchInfo.replace('or', '');
          searchInfo = searchInfo.replace('so', '');
          searchInfo = searchInfo.replace('  ', '').trim();
          // // console.log(searchInfo);
          let searchKeys = searchInfo.split(' ');
          // // console.log(searchKeys);
          let sql = `select ${(offset === 'false' ? 'count(*)' : '*')} from subject where name COLLATE utf8mb4_general_ci like :key0`;
          let keyObj = {};
          for (let i = 1; i < searchKeys.length; i++) {
              sql += ` or name like :key${i} `;
          }
              keyObj = {...{key0: '%'+searchKeys[0]+'%'}, ...keyObj};
          for (let i = 1; i < searchKeys.length; i++) {
              keyObj = {...{[`key${i}`]: '%'+searchKeys[i]+'%'}, ...keyObj};
          }
          if (option2) {
          sql += ` order by name asc limit ${(offset === 'false' ? ' 0 ' : ' :limit ')} ${(offset === 'false' ? 'offset 0' : 'offset :offset')}`
           // // console.log(sql);
              keyObj = {...{offset: Number((offset ===  'false' ? '0' : offset))}, ...keyObj};
              keyObj = {...{limit: Number(limit)}, ...keyObj};
          }
          // // console.log(sql);
          return await db.query(sql, keyObj);



      }

      const aquireQuestionIdsTable = async (subjectId) => {
          subjectId = subjectId * 1;
          let sql = `select subject_id, question_id, information_id, position from qIdiId where subject_id like ${Number(subjectId)}`
          return await db.query(sql);

      }

      const selectGroupedQuestionInformaitonById = async (object) => {
            // // console.log('I got here');
          const {arr, toggle} = object;
          // // console.log(toggle);
          let word = 'information';
          let word2 = 'question_information';
          if (toggle === false) {
              word = 'question';
              word2 = 'qIdiId'
          }
          // // console.log(typeof arr);
          // // console.log(arr, 'hello');
      let sql = `select * from ${word2} where `;
          let keys = {};
          let count = 0;
          for (let value of arr) {
              // // console.log(value);
              if (count === 0) {
                  sql += ` ${word+'_id'} = :${'a'+count} `;
                  keys = {...keys, ...{['a'+count]: value}};
              } else if (count > 0 ) {
              sql += ` or ${word+'_id'} = :${'a'+count} `;
              keys = {...keys, ...{['a'+count]: value}};
          }
          count++;
      }
      sql += ';';
      // // console.log(sql, keys);
              return await db.query(sql, keys);



          }

  let funkyFillingFunction = async () => {

      let sql = `insert into subject (name, introduction, creator, timestamp, last_altered_by, visible, links, number_of_questions, number_of_removal, version) values (:name, :introduction, :creator, now(), :creator2, 1, :links, ${1}, ${1}, 1)`;
      let result = await db.query(sql, {name: 'hugo2', introduction: 'introduction', creator: 1, creator2: 1, links: '[]'})
      let id;

      let result2, query1, query2, toggle;
     toggle = null;
      for (let i=0; i < 1000; i++) {
          sql = `insert into question_id (subject_id, name, info, creator, timestamp, visible, position) values (:subject, :name, :info, :creator, now(), 0, :position)`;
          result2 = await db.query(sql, {subject: result.insertId, name: 'balloni'+i, info: 'description'+i, creator: 1, position: parseFloat(i)})

          for (let a = 0 ; a < 11 ; a++) {
              if (toggle === 'another' || null ) {
                  toggle = true;
              } else if (toggle === false) {
                  toggle = 'another'
              } else {
              toggle = false;
              }
              let sql = `insert into question_information (subject_id, question_id, question_information, choice0, choice1, choice2, choice3, choice4, choice5, hint0, hint1, hint2, reply0, reply1, reply2, reply3, reply4, reply5, correct_choice,  creator, timestamp, last_altered_by, visible) values (:subjectId, :questionId, :questionInformation, :choice0, :choice1, :choice2, :choice3, :choice4, :choice5, :hint0, :hint1, :hint2, :reply0, :reply1, :reply2, :reply3, :reply4, :reply5, :correct_choice,  :creator, now(), :last_altered_by, 0) ; `;
              let sql1 = `insert into qIdiId (subject_id, question_id, information_id, position) values (:subjectId, :questionId, :informationId, :position) ; `;

              //  try {
              if (toggle) {
              query1 = await db.query(sql, { subjectId: result.insertId, questionId: result2.insertId, questionInformation: 'questionInformation'+i, choice0: 'choice0'+a, choice1: 'choice1'+a, choice2: 'choice2'+a, choice3: 'choice3'+a, choice4: 'choice4'+a, choice5: '', hint0: 'hint0'+a, hint1: "hint1"+a, hint2: '', reply0: 'answer0', reply1: 'answer1', reply2: 'answer2', reply3: 'answer3', reply4: 'answer4', reply5: 'answer5', correct_choice: 1,  creator: 2, last_altered_by: 1});



              query2 = await db.query(sql1, {position: parseFloat(i), subjectId: result.insertId, informationId: query1.insertId, questionId: result2.insertId});
              }
              //     } catch  {
              // // // console.log('failed');
              //     }
          }

      }


  }


  const insertAppendix = async (filename, object) => {
      const { info, subjectId, position} = object;
      const sql = `insert into files (filename, type, info, subject_id, position) values (:filename, 3, :info, :subjectId, :position)`;
      return await db.query(sql, {filename: filename, info: info, subjectId: subjectId, position: position});

  }
  const insertAudio = async (filename, object) => {
      const {info, subjectId, position} = object;
      const sql = `insert into files (filename, type, info, subject_id, position) values (:filename, 2, :info, :subjectId, :position)`;
      return await db.query(sql, {filename: filename, info: info, subjectId: subjectId, position: position});
      
    }
    const insertVideo = async (filename, object) => {
        const { info, subjectId, position} = object;
        const sql = `insert into files (filename, type, info, subject_id, position) values (:filename, 1, :info, :subjectId, :position)`;
        return await db.query(sql, {filename: filename, info: info, subjectId: subjectId, position: position});
        
    }
    const deleteFile = async (object) => {
        // // console.log(object);
        const {filename} = object;
        const sql = `delete from files where filename like :filename`;
        return await db.query(sql, {filename: filename});
        
    }
    const inputSubjectEntire = async (object) => {
        // // console.log(object);
        // subject 
        let infoObj = {};
        let counter = 0;
        let subjectId;
        
        let  questionInformationE = {}; 
        let  hint0E   = {}; 
        let  hint1E   = {}; 
        let  hint2E   = {}; 
        let  choice0E = {}; 
        let  answer0E = {}; 
        let  choice1E = {}; 
        let  answer1E = {}; 
        let  choice2E = {}; 
        let  answer2E = {}; 
        let  choice3E = {}; 
        let  answer3E = {}; 
        let  choice4E = {}; 
        let  answer4E = {}; 
        let  choice5E = {}; 
        let  answer5E = {}; 
        let  correctE = {}; 
        let {numberOfQuestions, name, numberOfRemoval, introduction, creator, creator2, links} = object;
        let subjectName = name;
        // // console.log(numberOfQuestions, name, numberOfRemoval, introduction, creator, creator2, links);
        numberOfQuestions = numberOfQuestions * 1;
        numberOfRemoval = numberOfRemoval * 1;
        creator = creator * 1;
        let sql = 'start transaction; ';
        sql = `insert into subject (name, introduction, creator, timestamp, last_altered_by, visible, links, number_of_questions, number_of_removal, version) values (:subjectName, :introduction, ${creator}, now(), ${creator}, 1, :links, ${numberOfQuestions}, ${numberOfRemoval}, 0); `;
      
      let  creatorE = creator !== null ? creator : '';
      let subjectNameE = name !== null ? name : '';
      let introductionE = introduction !== null ? introduction : '';
      let linksE = links  !== null ? links : '';
      let infoE = {};
      let nameE = {};
      let counter2 = 0;
      let revCount = {};
      for (let key in object.questionIds) {
        revCount[counter] = 0;
          let {info, position} = object.questionIds[key];
          name = object.questionIds[key].name;
            position = parseInt(position) * parseInt(1);
          infoE[counter] = info !== null ? info : '';
          nameE[counter] = name !== null ? name : '';
         sql += `insert into question_id (subject_id, name, info, creator, timestamp, visible, position) values ((select MAX(subject_id) from subject where creator = ${creator}), :name${counter}, :info${counter}, ${creator}, now(), 0, ${position}); `;          
        

              
                 

        for (let key2 in object.questionIds[key].questionInformation) {
           if (typeof object.questionIds[key].questionInformation[key2].questionInfo !== 'undefined') {
           if (typeof questionInformationE[counter] !== 'object') {
            questionInformationE[counter] ={}; 
            hint0E[counter] = {}; 
            hint1E[counter] = {}; 
            hint2E[counter] = {}; 
            choice0E[counter] = {}; 
            answer0E[counter] = {}; 
            choice1E[counter] = {}; 
            answer1E[counter] = {}; 
            choice2E[counter] = {}; 
            answer2E[counter] = {}; 
            choice3E[counter] = {}; 
            answer3E[counter] = {}; 
            choice4E[counter] = {}; 
            answer4E[counter] = {}; 
            choice5E[counter] = {}; 
            answer5E[counter] = {}; 
            correctE[counter] = {};
           }
            let questionInformationObj = object.questionIds[key].questionInformation[key2];
            
            let {questionInfo, hint0, hint1, hint2, choice0, reply0, choice1, reply1, choice2, reply2, choice3, reply3, choice4, reply4,   choice5, reply5, correct_choice, id, questionId } = questionInformationObj;
         
                console.log('cheereo!!!!');
                // console.log(object.questionIds[key].questionInformation[key2]);
                // // // console.log(counter);
                console.log(questionInfo);
                console.log(revCount[counter]);
                questionInformationE[counter][revCount[counter]] = questionInfo !== null && typeof questionInfo !== 'undefined' ? hint0 : '';;
                
            // // console.log(questionInformationE[counter][revCount[counter]]);
            // // console.log('here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            hint0E[counter][revCount[counter]] = hint0 !== null && typeof hint0 !== 'undefined' ? hint0 : '';
            hint1E[counter][revCount[counter]] = hint1 !== null && typeof hint1 !== 'undefined'  ? hint1 : '';
            hint2E[counter][revCount[counter]] = hint2 !== null && typeof hint2 !== 'undefined'  ? hint2 : '';
            choice0E[counter][revCount[counter]] = choice0 !== null && typeof choice0 !== 'undefined'  ? choice0 : '';
            answer0E[counter][revCount[counter]] = reply0 !== null && typeof reply0 !== 'undefined'  ? reply0 : '';
            choice1E[counter][revCount[counter]] = choice1 !== null && typeof choice1 !== 'undefined'  ? choice1 : '';
            answer1E[counter][revCount[counter]] = reply1 !== null && typeof reply1 !== 'undefined'  ? reply1 : '';
            choice2E[counter][revCount[counter]] = choice2 !== null && typeof choice2 !== 'undefined'  ? choice2 : '';
            answer2E[counter][revCount[counter]] = reply2 !== null && typeof reply2 !== 'undefined'  ? reply2 : '';
            choice3E[counter][revCount[counter]] = choice3 !== null && typeof choice3 !== 'undefined'  ? choice3 : '';
            answer3E[counter][revCount[counter]] = reply3 !== null && typeof reply3 !== 'undefined'  ? reply3 : '';
            choice4E[counter][revCount[counter]] = choice4 !== null && typeof choice4 !== 'undefined'  ? choice4 : '';
            answer4E[counter][revCount[counter]] = reply4 !== null && typeof reply4 !== 'undefined'  ? reply4 : '';
            choice5E[counter][revCount[counter]] = choice5 !== null && typeof choice5 !== 'undefined'  ? choice5 : '';
            answer5E[counter][revCount[counter]] = reply5 !== null && typeof reply5 !== 'undefined'  ? reply5 : '';
            correctE[counter][revCount[counter]] = correct_choice !== null && typeof correct_choice !== 'undefined'  ? correct_choice : '';
            
            
            sql += ` insert into question_information (subject_id, question_id, question_information, choice0, choice1, choice2, choice3, choice4, choice5, hint0, hint1, hint2, reply0, reply1, reply2, reply3, reply4, reply5, correct_choice,  creator, timestamp, last_altered_by,      visible) values (
            (select MAX(subject_id) from subject where creator = ${creator} ),
            
            (select MAX(question_id) from question_id WHERE subject_id = (select MAX(subject_id) from subject where creator = ${creator} )),
            
            :questionInformation${counter}${revCount[counter]}, :choice0${counter}${revCount[counter]}, :choice1${counter}${revCount[counter]}, :choice2${counter}${revCount[counter]}, :choice3${counter}${revCount[counter]}, :choice4${counter}${revCount[counter]}, :choice5${counter}${revCount[counter]}, :hint0${counter}${revCount[counter]}, :hint1${counter}${revCount[counter]}, :hint2${counter}${revCount[counter]}, :reply0${counter}${revCount[counter]}, :reply1${counter}${revCount[counter]}, :reply2${counter}${revCount[counter]}, :reply3${counter}${revCount[counter]}, :reply4${counter}${revCount[counter]}, :reply5${counter}${revCount[counter]}, :correct_choice${counter}${revCount[counter]},  ${creator}, now(), ${creator}, 0) ; `;
            
            sql += `insert into qIdiId (subject_id, question_id, information_id, position) values ((select MAX(subject_id) from subject where creator = ${creator}), (select MAX(question_id) from question_id WHERE subject_id = (select MAX(subject_id) from subject where creator = ${creator} )), (select MAX(information_id) from question_information WHERE subject_id = (select MAX(subject_id) from subject where creator = ${creator} )), ${position}) ; `;
            
            counter2++
            console.log(revCount[counter]);
            revCount[counter]++;

        }
        }
        
        // // console.log(revCount);
        // // console.log("here !!!!!!!!!!");
        
        counter++
        // // // console.log(infoObj);
        
        // // // console.log(counter2);
    }
    // // // console.log(sql);
    
    // // console.log(questionInformationE);
    for (let a = 0; a < counter; a++) {
        infoObj[`name${a}`] = nameE[a] !== null ? nameE[a] : '';
        infoObj[`info${a}`] = infoE[a] !== null ? infoE[a] : '';
        // if (typeof infoObj[`questionInformation${a}${0}`] !== 'undefined') {
    for(let i = 0; i < revCount[a]; i++) {
        console.log('hellow!!!!');
        console.log(a);
        console.log(i);
        infoObj[`questionInformation${a}${i}`] = questionInformationE[a][i];
        // // console.log(infoObj[`questionInformation${a}${i}`]);
        infoObj[`hint0${a}${i}`] = hint0E[a][i];
        infoObj[`hint1${a}${i}`] = hint1E[a][i];
        infoObj[`hint2${a}${i}`] = hint2E[a][i];
        infoObj[`choice0${a}${i}`] = choice0E[a][i];
        infoObj[`reply0${a}${i}`] = answer0E[a][i];
        infoObj[`choice1${a}${i}`] = choice1E[a][i];
        infoObj[`reply1${a}${i}`] = answer1E[a][i];
        infoObj[`choice2${a}${i}`] = choice2E[a][i];
        infoObj[`reply2${a}${i}`] = answer2E[a][i];
        infoObj[`choice3${a}${i}`] = choice3E[a][i];
        infoObj[`reply3${a}${i}`] = answer3E[a][i];
        infoObj[`choice4${a}${i}`] = choice4E[a][i];
        infoObj[`reply4${a}${i}`] = answer4E[a][i];
        infoObj[`choice5${a}${i}`] = choice5E[a][i];
        infoObj[`reply5${a}${i}`] = answer5E[a][i];
        // chat gpt either needs to be told to rectify or I need to do the below.
        infoObj[`correct_choice${a}${i}`] = correctE[a][i]+1;       
    }
    // }
    }
    infoObj[`subjectName`] = subjectName !== null ? subjectName : '';
    infoObj[`introduction`] = introduction !== null ? introduction : '';
    infoObj[`links`] = links  !== null ? links : '';
    console.log(infoObj);
    // // console.log(sql);
    try {
        sql += 'commit;';
      return  await db.query(sql, infoObj);
        
    } catch(e)  {
        // console.log(e);
    }
    
  }


const inputQuestions = async (object) => {
        console.log(object);
        // subject 
        let infoObj = {};
        let counter = 0;
        console.log(object.questionId);
        let subjectId = object.subjectId;
        let questionId = object.questionId;
        let creator = object.creator;
        let position = object.position;
try {
    subjectId = subjectId * 1;
    creator = creator * 1;
    position = parseInt(position) * parseInt(1);
    questionId = questionId *1;
    console.log(subjectId, creator, position, questionId);
} catch {

}
        let  questionInformationE = {}; 
        let  hint0E   = {}; 
        let  hint1E   = {}; 
        let  hint2E   = {}; 
        let  choice0E = {}; 
        let  answer0E = {}; 
        let  choice1E = {}; 
        let  answer1E = {}; 
        let  choice2E = {}; 
        let  answer2E = {}; 
        let  choice3E = {}; 
        let  answer3E = {}; 
        let  choice4E = {}; 
        let  answer4E = {}; 
        let  choice5E = {}; 
        let  answer5E = {}; 
        let  correctE = {}; 
     
      let counter2 = 0;
      let revCount = {};
        let sql = 'start transaction; ';
      for (let key2 in object) {
           if (typeof object[key2].questionInfo !== 'undefined') {
        
            questionInformationE[counter] ={}; 
            hint0E[counter] = {}; 
            hint1E[counter] = {}; 
            hint2E[counter] = {}; 
            choice0E[counter] = {}; 
            answer0E[counter] = {}; 
            choice1E[counter] = {}; 
            answer1E[counter] = {}; 
            choice2E[counter] = {}; 
            answer2E[counter] = {}; 
            choice3E[counter] = {}; 
            answer3E[counter] = {}; 
            choice4E[counter] = {}; 
            answer4E[counter] = {}; 
            choice5E[counter] = {}; 
            answer5E[counter] = {}; 
            correctE[counter] = {};
        
            let questionInformationObj = object[key2];
            
            let {questionInfo, hint0, hint1, hint2, choice0, reply0, choice1, reply1, choice2, reply2, choice3, reply3, choice4, reply4,   choice5, reply5, correct_choice} = questionInformationObj;
         
                console.log('cheereo!!!!');
                // console.log(object.questionIds[key].questionInformation[key2]);
                // // // console.log(counter);
                console.log(questionInfo);
                
                questionInformationE[counter] = questionInfo !== null && typeof questionInfo !== 'undefined' ? hint0 : '';;
                
            // // console.log(questionInformationE[counter]);
            // // console.log('here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            hint0E[counter] = hint0 !== null && typeof hint0 !== 'undefined' ? hint0 : '';
            hint1E[counter] = hint1 !== null && typeof hint1 !== 'undefined'  ? hint1 : '';
            hint2E[counter] = hint2 !== null && typeof hint2 !== 'undefined'  ? hint2 : '';
            choice0E[counter] = choice0 !== null && typeof choice0 !== 'undefined'  ? choice0 : '';
            answer0E[counter] = reply0 !== null && typeof reply0 !== 'undefined'  ? reply0 : '';
            choice1E[counter] = choice1 !== null && typeof choice1 !== 'undefined'  ? choice1 : '';
            answer1E[counter] = reply1 !== null && typeof reply1 !== 'undefined'  ? reply1 : '';
            choice2E[counter] = choice2 !== null && typeof choice2 !== 'undefined'  ? choice2 : '';
            answer2E[counter] = reply2 !== null && typeof reply2 !== 'undefined'  ? reply2 : '';
            choice3E[counter] = choice3 !== null && typeof choice3 !== 'undefined'  ? choice3 : '';
            answer3E[counter] = reply3 !== null && typeof reply3 !== 'undefined'  ? reply3 : '';
            choice4E[counter] = choice4 !== null && typeof choice4 !== 'undefined'  ? choice4 : '';
            answer4E[counter] = reply4 !== null && typeof reply4 !== 'undefined'  ? reply4 : '';
            choice5E[counter] = choice5 !== null && typeof choice5 !== 'undefined'  ? choice5 : '';
            answer5E[counter] = reply5 !== null && typeof reply5 !== 'undefined'  ? reply5 : '';
            correctE[counter] = correct_choice !== null && typeof correct_choice !== 'undefined'  ? correct_choice : '';
            
            
            sql += ` insert into question_information (subject_id, question_id, question_information, choice0, choice1, choice2, choice3, choice4, choice5, hint0, hint1, hint2, reply0, reply1, reply2, reply3, reply4, reply5, correct_choice,  creator, timestamp, last_altered_by, visible) values (
            ${subjectId},
            
            ${questionId},
            
            :questionInformation${counter}, :choice0${counter}, :choice1${counter}, :choice2${counter}, :choice3${counter}, :choice4${counter}, :choice5${counter}, :hint0${counter}, :hint1${counter}, :hint2${counter}, :reply0${counter}, :reply1${counter}, :reply2${counter}, :reply3${counter}, :reply4${counter}, :reply5${counter}, :correct_choice${counter},  ${creator}, now(), ${creator}, 0) ; `;
            
            sql += `insert into qIdiId (subject_id, question_id, information_id, position) values (${subjectId}, ${questionId}, (select MAX(information_id) from question_information WHERE subject_id = (select MAX(subject_id) from subject where creator = ${creator} )), ${position}) ; `;
            
            
         

            counter++
        }
        }
        
        // // console.log(revCount);
        // // console.log("here !!!!!!!!!!");
        
        // // // console.log(infoObj);
        
        // // // console.log(counter2);
    
    // // // console.log(sql);
    
    // // console.log(questionInformationE);

    for(let i = 0; i < counter; i++) {
        console.log('hellow!!!!');
     
        console.log(i);
        infoObj[`questionInformation${i}`] = questionInformationE[i];
        // // console.log(infoObj[`questionInformation${i}`]);
        infoObj[`hint0${i}`] = hint0E[i];
        infoObj[`hint1${i}`] = hint1E[i];
        infoObj[`hint2${i}`] = hint2E[i];
        infoObj[`choice0${i}`] = choice0E[i];
        infoObj[`reply0${i}`] = answer0E[i];
        infoObj[`choice1${i}`] = choice1E[i];
        infoObj[`reply1${i}`] = answer1E[i];
        infoObj[`choice2${i}`] = choice2E[i];
        infoObj[`reply2${i}`] = answer2E[i];
        infoObj[`choice3${i}`] = choice3E[i];
        infoObj[`reply3${i}`] = answer3E[i];
        infoObj[`choice4${i}`] = choice4E[i];
        infoObj[`reply4${i}`] = answer4E[i];
        infoObj[`choice5${i}`] = choice5E[i];
        infoObj[`reply5${i}`] = answer5E[i];
        // chat gpt either needs to be told to rectify or I need to do the below.
        infoObj[`correct_choice${i}`] = correctE[i]+1;    
         
    }
    // }
    
    sql += `update subject set version = version+1 where subject_id = ${subjectId};`;
    console.log(infoObj);
    // // console.log(sql);
    try {
        sql += 'commit;';
      return  await db.query(sql, infoObj);
        
    } catch(e)  {
        // console.log(e);
    }
    
  }

  const insertFlashcard = async (object) => {
    let sql = 'start transaction ;';
    let infoObj = {};
    for (let i = 0; i < object.length; i++) {
    let {subjectId, imageLocation, question, answer} = object[i];
     sql += `insert into flashcards (subject_id, question, answer, image_location) values (:subjectId${i}, question${i}, answer${i}, imageLocation${i}) ;`;
        infoObj[`subjectId${i}`] = subjectId;
        infoObj[`question${i}`] = question;
        infoObj[`answer${i}`] = answer;
        infoObj[`imageLocation${i}`] = answer;
    }

    sql += 'commit; '
    return await db.query(sql, entryObj);
  }


//   const inputSubjectEntire = async (object) => {
//     // // console.log(object);
//     // subject 
//     let counter = 0;
//     let subjectId;
    
//     let {numberOfQuestions, name, numberOfRemoval, introduction, creator, creator2, links} = object;
//     // // console.log(numberOfQuestions, name, numberOfRemoval, introduction, creator, creator2, links);
//     numberOfQuestions = numberOfQuestions * 1;
//     numberOfRemoval = numberOfRemoval * 1;
//     let sql = `insert into subject (name, introduction, creator, timestamp, last_altered_by, visible, links, number_of_questions, number_of_removal, version) values (:subjectName, :introduction, ${creator}, now(), ${creator2}, 1, :links, ${numberOfQuestions}, ${numberOfRemoval}, 0)`;
//     try {
//     let subjectQueryResult = await db.query(sql, {subjectName: name, introduction: introduction, links: links});
//     // // console.log(subjectQueryResult);
//     subjectId = subjectQueryResult.insertId;
//     } catch {
//         // // console.log('stage one error!');
//     }
//     for (let key in object.questionIds) {
//         let counter2 = 0;
//         let {subject, name, description, id, position} = object.questionIds[key];
//         let sql2 = `insert into question_id (subject_id, name, info, creator, timestamp, visible, position) values (:subject, :name, :info, :creator, now(), 0, :position);`;          
//         let qIdResult = await db.query(sql2, {subject: subjectId, name: name, info: description, creator: id, position: position});
//         // // console.log(qIdResult);
//         // question information
//         let questionId = qIdResult.insertId;
//                  let  questionInformationE = {}; 
//                  let  hint0E   = {}; 
//                  let  hint1E   = {}; 
//                  let  hint2E   = {}; 
//                  let  choice0E = {}; 
//                  let  answer0E = {}; 
//                  let  choice1E = {}; 
//                  let  answer1E = {}; 
//                  let  choice2E = {}; 
//                  let  answer2E = {}; 
//                  let  choice3E = {}; 
//                  let  answer3E = {}; 
//                  let  choice4E = {}; 
//                  let  answer4E = {}; 
//                  let  choice5E = {}; 
//                  let  answer5E = {}; 
//                  let  correctE = {}; 
//                  let  questionIdE; 
//                  let  positionE = parseFloat(position); 

//             let sql3 = 'start transaction; ';
//         for (let key2 in object.questionIds[key].questionInformation) {
            
//             let questionInformationObj = object.questionIds[key].questionInformation[key2];
            
//             let {question_information, hint0, hint1, hint2, choice0, reply0, choice1, reply1, choice2, reply2, choice3, reply3, choice4, reply4,   choice5, reply5, correct_choice, id, questionId } = questionInformationObj;
//             // // console.log(question_information);
//             questionInformationE[counter2] = question_information;
//             // // console.log(questionInformationE[counter2]);
//             hint0E[counter2] = hint0 !== null ? hint0 : '';
//             hint1E[counter2] = hint1 !== null ? hint1 : '';
//             hint2E[counter2] = hint2 !== null ? hint2 : '';
//             choice0E[counter2] = choice0 !== null ? choice0 : '';
//             answer0E[counter2] = reply0 !== null ? reply0 : '';
//             choice1E[counter2] = choice1 !== null ? choice1 : '';
//             answer1E[counter2] = reply1 !== null ? reply1 : '';
//             choice2E[counter2] = choice2 !== null ? choice2 : '';
//             answer2E[counter2] = reply2 !== null ? reply2 : '';
//             choice3E[counter2] = choice3 !== null ? choice3 : '';
//             answer3E[counter2] = reply3 !== null ? reply3 : '';
//             choice4E[counter2] = choice4 !== null ? choice4 : '';
//             answer4E[counter2] = reply4 !== null ? reply4 : '';
//             choice5E[counter2] = choice5 !== null ? choice5 : '';
//             answer5E[counter2] = reply5 !== null ? reply5 : '';
//             correctE[counter2] = correct_choice;
//             positionE = position;
//             // // console.log(positionE);
            
//             sql3 += `insert into question_information (subject_id, question_id, question_information, choice0, choice1, choice2, choice3, choice4,     choice5, hint0, hint1, hint2, reply0, reply1, reply2, reply3, reply4, reply5, correct_choice,  creator, timestamp, last_altered_by,      visible) values (:subjectId${counter2}, :questionId${counter2}, :questionInformation${counter2}, :choice0${counter2}, :choice1${counter2}, :choice2${counter2}, :choice3${counter2}, :choice4${counter2}, :choice5${counter2}, :hint0${counter2}, :hint1${counter2}, :hint2${counter2}, :reply0${counter2}, :reply1${counter2}, :reply2${counter2}, :reply3${counter2}, :reply4${counter2}, :reply5${counter2}, :correct_choice${counter2},  :creator${counter2}, now(), :last_altered_by${counter2}, 0) ; `;
            
//             sql3 += `insert into qIdiId (subject_id, question_id, information_id, position) values (:subjectId2${counter2}, :questionId2${counter2}, (select MAX(information_id) from question_information WHERE subject_id = :subjectId3${counter2}),     :position${counter2}) ; `;
            
//             counter2++
//         }
        
//         sql3 += 'commit;';
//         // // console.log(sql3);
//         let infoObj = {};
//         // // console.log(questionInformationE[String(0)]);
//         for(let i = 0; i < counter2; i++) {
//             infoObj[`questionInformation${i}`] = questionInformationE[String(i)];
//             infoObj[`hint0${i}`] = hint0E[i]
//             infoObj[`hint1${i}`] = hint1E[i];
//             infoObj[`hint2${i}`] = hint2E[i];
//             infoObj[`choice0${i}`] = choice0E[i];
//             infoObj[`reply0${i}`] = answer0E[i];
//             infoObj[`choice1${i}`] = choice1E[i];
//             infoObj[`reply1${i}`] = answer1E[i];
//             infoObj[`choice2${i}`] = choice2E[i];
//             infoObj[`reply2${i}`] = answer2E[i];
//             infoObj[`choice3${i}`] = choice3E[i];
//             infoObj[`reply3${i}`] = answer3E[i];
//             infoObj[`choice4${i}`] = choice4E[i];
//             infoObj[`reply4${i}`] = answer4E[i];
//             infoObj[`choice5${i}`] = choice5E[i];
//             infoObj[`reply5${i}`] = answer5E[i];
//             // chat gpt either needs to be told to rectify or I need to do the below.
//             infoObj[`correct_choice${i}`] = correctE[i]+1;
//             infoObj[`position${i}`] = parseFloat(positionE);
//             infoObj[`subjectId${i}`] = subjectId;
//             infoObj[`questionId${i}`] = questionId;
//             infoObj[`subjectId2${i}`] = subjectId;
//             infoObj[`subjectId3${i}`] = subjectId;
//             infoObj[`questionId2${i}`] = questionId;
//             infoObj[`last_altered_by${i}`] = creator;
//             infoObj[`creator${i}`] = creator;
//         }
        
        
//         // // console.log(infoObj);
//         // // console.log(sql3);
//         try {
//            await db.query(sql3, infoObj);
            
//         } catch  {
//             // // console.log('failed');
//         }
// counter++
// }



//   }
  // funkyFillingFunction();


      //not currently needed
  //     const refillQIdIId = async () => {


  //     const select = async () => {
  //         const sql = 'select i.information_id, i.question_id, i.subject_id, q.position from question_information i left join question_id q on q.question_id = i.question_id order by i.subject_id, q.position, i.question_id';
  //         return await db.query(sql);
  //     };
  //     const place = async (results) => {
  //         let sql = '';
  //         let object = {}
  //         for (let i = 0 ; i < results.length; i++) {
  //             // // console.log(i)
  //             sql += `insert into qIdiId (information_id, question_id, subject_id, position) values ( :informationId${i}, :questionId${i}, :subjectId${i}, :position${i} );`;
  //             object = {...object, ...{['position'+i]: results[i].position, [`informationId${i}`]: results[i].informationId, [`subjectId${i}`]: results[i].subjectId, [`questionId${i}`]: results[i].questionId }}


  //         }
  //         return await db.query(sql, object);
  // }
  //     let count = 0;
  //     let selection = await select();


  //     // // console.log(selection);
  //    return await place(selection);
  //     }
  //     refillQIdIId();
      // // // console.log(refillQIdIId());
      export default { selectFromModuleIndexTableViaUserIdAndLetter, updateCompetition, selectCompetitions, selectSiteSettings, selectComments, updateAdminGroupModule, selectFromModuleAdmins, deleteBio, selectReviews, insertIntoUsers, fetchUserViaEmail, updateFailedAttempts, resetFailedAttempts, insertIntoModuleIndexTable, searchModuleIndexTableViaStringAndField, insertIntoAdminIndex, selectFromAdminIndexViaUserId, selectAllAdminIndexUsers, insertIntoBio, selectBioViaId, updateBioViaId, insertIntoInvites,  selectInvites, updateInvites, deleteInvite, insertIntoModuleAdmins, deleteFromModuleAdmins, insertIntoAdminGroupModules, deleteFromAdminGroupModules, selectAdminGroupModuleViaId, selectAdminGroupModuleViaKey, insertIntoForum, updateForumComment, deleteComment, insertReview, deleteReviewPastNuTen, insertVote, updateUpVote, updateDownVote,  selectVotes, determineHighestVoteOnComp, insertCompetition, deleteCompetition, insertReportType,  selectReportTypeRows, insertReport, countReports, selectReports, updateSiteSettingsForumSwitch, updateSiteSettingsLoginSwitch,
  incrementVersionViaSubjectId,
  insertAudio,
  insertVideo,
  insertAppendix,
  deleteFile,
  inputSubjectEntire,
  selectSubjectViaIdWithFiles,
        inputQuestions,
  selectGroupedQuestionInformaitonById,
  selectViaSearch,
  updateQuestionInformation,
      aquireQuestionId,
      selectIndividualQuestionIds,
      updateQuestionIds,
      updateSubjectViaId,
      selectSubjectViaId,
      countOfSubjectsAndInitEntries,
      countOfSubjectViaLetterAndInitEntries,
      selectAlphaSubjectViaPagination,
      selectSubjectViaLetterPagination,
      insertQuestionInformation,
      aquireQuestionIds,
      insertQuestionIds,
      getCountOfQuestionIds,
      getLastPositionOfQuestionIds,
      insertSubject,
      selectQuestionInformationViaQuestionIdPagination,
      selectQuesitonInformationIdsViaSubjectId,
      selectIndividualQuesitonInformation,
      selectQuestionInformationCountViaQuesitonId,
      aquireQuestionIdsTable
      };
