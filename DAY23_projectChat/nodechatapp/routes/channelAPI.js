var express = require("express");
var router = express.Router();
var db = require('../models/index');

var apiResult = {
  code: 200,
  data: null,
  result: ""
}

router.get("/all", async (req, res, next) => {
  try {

    var channel_list = await db.Channel.findAll();

    apiResult.code = 200;
    apiResult.data = channel_list;
    apiResult.result = "OK";

  } catch (err) {

    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Failed";
  }

  res.json(apiResult);

});

router.post("/create", async (req, res, next) => {

  try {
    var channel = {
      channel_id:req.body.channel_id,
      community_id:req.body.community_id,
      category_code:req.body.category_code,
      channel_name:req.body.channel_name,
      user_limit:req.body.user_limit,
      channel_img_path:req.body.channel_img_path,
      channel_desc:req.body.channel_desc,
      channel_state_code:req.body.channel_state_code,
      reg_date: Date.now(),
      reg_member_id:1
    };

    await db.Channel.create(channel);

    apiResult.code = 200;
    apiResult.data = channel;
    apiResult.result = "OK";

  } catch (err) {

    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Failed";
  }

  res.json(apiResult);

});

router.post("/modify", async (req, res, next) => {
  try {
    var channel = {
      channel_id:req.body.channel_id,
      community_id:req.body.community_id,
      category_code:req.body.category_code,
      channel_name:req.body.channel_name,
      user_limit:req.body.user_limit,
      channel_img_path:req.body.channel_img_path,
      channel_desc:req.body.channel_desc,
      channel_state_code:req.body.channel_state_code,
      edit_date:Date.now(),
      edit_member_id:1
    };
    
    var affectedCnt = await db.Channel.update(channel, {where:{channel_id:channel_id}});

    apiResult.code = 200;
    apiResult.data = affectedCnt;
    apiResult.result = "OK";

  } catch (err) {

    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Failed";
  }

  res.json(apiResult);
});

//params로 정보 받음
router.post("/delete/:cid", async (req, res, next) => {
  try {
    var channel_id = req.params.cid;

    var affectedCnt = await db.Channel.destory({where:{channel_id:channel_id}});

    apiResult.code = 200;
    apiResult.data = affectedCnt;
    apiResult.result = "OK";

  } catch (err) {

    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Failed";
  }

  res.json(apiResult);
});

router.get("/:cid", async (req, res, next) => {
  try {
    var channel_id = req.params.cid;
    
    var channel = await db.Channel.findOne({where:{channel_id:channel_id}});

    apiResult.code = 200;
    apiResult.data = channel;
    apiResult.result = "OK";

  } catch (err) {

    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Failed";
  }
  
  res.json(apiResult);
});

module.exports = router;