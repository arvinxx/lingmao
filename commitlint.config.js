module.exports = {
  rules: {
    'type-enum': [
      2,
      'always',
      [
        ':art:',
        ':zap:',
        ':fire:',
        ':bug:',
        ':ambulance:',
        ':sparkles:',
        ':memo:',
        ':rocket:',
        ':lipstick:',
        ':tada:',
        ':white_check_mark:',
        ':lock:',
        ':apple:',
        ':penguin:',
        ':checkered_flag:',
        ':robot:',
        ':green_apple:',
        ':bookmark:',
        ':rotating_light:',
        ':construction:',
        ':green_heart:',
        ':arrow_down:',
        ':arrow_up:',
        ':construction_worker:',
        ':chart_with_upwards_trend:',
        ':hammer:',
        ':heavy_minus_sign:',
        ':whale:',
        ':heavy_plus_sign:',
        ':wrench:',
        ':globe_with_meridians:',
        ':pencil2:',
        ':hankey:',
        ':rewind:',
        ':twisted_rightwards_arrows:',
        ':package:',
        ':alien:',
        ':truck:',
        ':page_facing_up:',
        ':boom:',
        ':bento:',
        ':ok_hand:',
        ':wheelchair:',
        ':bulb:',
        ':beers:',
        ':speech_balloon:',
        ':card_file_box:',
        ':loud_sound:',
        ':mute:',
      ],
    ], // 首行验证类型为 gitmoji 的内容
    'body-leading-blank': [2, 'always'], // 内容以空行开始
    'footer-leading-blank': [2, 'always'], // 结尾以空行开始
    'header-max-length': [2, 'always', 72], // 标题最大长度 72 个字符
    'body-max-length': [2, 'always', 72], // 内容最大长度72个字符
    'scope-case': [2, 'always', 'lower-case'], // Scope 永远小写
    'subject-case': [2, 'always', ['sentence-case']], // 标题必须以大写字母开头
    'subject-empty': [2, 'never'], // 不允许标题空着
    'subject-full-stop': [2, 'never', '.'], // 不允许使用句号
    'type-case': [2, 'always', 'lower-case'], // type 必须小写
    'type-empty': [2, 'never'], // type 不能为空
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(:\w*:)(?:\((.*?)\))?\s((?:.*(?=\())|.*)(?:\(#(\d*)\))?/,
      headerCorrespondence: ['type', 'scope', 'subject', 'ticket'],
    }, // gitmoji commit 提取表达式 for commitlint
  }, // 为 gitmoji 风格提供单独的解析器
};
