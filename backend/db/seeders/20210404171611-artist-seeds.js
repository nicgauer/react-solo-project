'use strict';
const bcrypt = require('bcryptjs');
const faker = require('faker');

const pictures = [
  'https://soundcampify.s3.amazonaws.com/1617553102406.jpg',
  'https://soundcampify.s3.us-east-2.amazonaws.com/1617553340289.jpg',
  'https://soundcampify.s3.us-east-2.amazonaws.com/1617553340292.jpg',
  'https://soundcampify.s3.us-east-2.amazonaws.com/1617553576458.jpg',
  'https://soundcampify.s3.us-east-2.amazonaws.com/1617553576460.jpg',
  'https://soundcampify.s3.us-east-2.amazonaws.com/1617553576462.jpg',
  'https://i.imgur.com/pIRgwlX.jpg',
  'https://i.imgur.com/l5eyFYc.jpg',
  'https://i.imgur.com/yy3W4ZV.jpg',
  'https://i.pinimg.com/474x/78/9e/81/789e81eac45a24c76f74269fe484ec80.jpg',
  'https://i.imgur.com/bu0TMX6.jpg',
  'https://i.imgur.com/712JFKD.png',
  'https://i.redd.it/gv4fps2q6yt31.jpg',
  'https://i.imgur.com/rpQdRoY.jpg',
  'https://i.imgur.com/sBgJmm8.jpg',
  'https://t4.ftcdn.net/jpg/02/91/24/27/360_F_291242770_z3XC7rJB1Mvc5jVMsEY9Dx2xMrX4sxUi.jpg',
  'https://i.imgur.com/fLZ35cI.jpg',
  'https://i.pinimg.com/originals/3f/3d/9a/3f3d9a461fb3d34fb91e5bad15eac19f.jpg',
  'https://i.pinimg.com/originals/ee/65/72/ee6572e28e56e17f9e368734b11587e1.jpg',
  'https://i.imgur.com/QGPh2gQ.jpg',
  'https://i.imgur.com/BTAqNqy.jpg',
  'https://i.imgur.com/KN7T7iC.jpg',
  'https://i.imgur.com/g9eDkaw.jpg',
  'https://i.imgur.com/HqEJERD.jpg',
  'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://i.imgur.com/xMyASqyh.jpg',
  'https://i.imgur.com/Uv1NUNm.jpg',
  'https://i.imgur.com/ClS3UN7.jpg',
  'https://i.pinimg.com/736x/61/25/78/612578b1e27df2032b677f2c8b621f69.jpg',
  'https://i.imgur.com/2kkUHzN.jpg',
  'https://i.imgur.com/JGQtiCK.jpg',
  'https://i.imgur.com/tvWPkjKg.jpg',
  'https://image.shutterstock.com/image-photo/retro-old-radio-front-mint-260nw-388892920.jpg',
  'https://images.pexels.com/photos/6966/abstract-music-rock-bw.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://thumbs.dreamstime.com/b/violet-music-notes-sheet-tonality-blurred-lights-background-112324226.jpg',
  'https://previews.123rf.com/images/macsim/macsim1202/macsim120200073/12369837-portrait-of-a-male-teenager-listening-to-music.jpg',
  'https://media.istockphoto.com/photos/senior-woman-listening-music-picture-id478815074',
  'https://thumbs.dreamstime.com/b/children-group-playing-music-instruments-kids-musical-band-over-white-background-148626425.jpg',
  'https://images.pexels.com/photos/96380/pexels-photo-96380.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://previews.123rf.com/images/sebra/sebra1507/sebra150700122/43575050-listening-music.jpg',
  'https://d2ai0ibaxpbki1.cloudfront.net/v2/images/collections/acoustic-stock-music-royalty-free-for-video.jpg',
  'https://s3.amazonaws.com/pbblogassets/uploads/2012/04/instruments.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5dvvVLlHbq1ldcm8ZCfB1gHk-Vn5khDcaCQ&usqp=CAU',
  'https://assets.classicfm.com/2013/23/bad-stock-photos-18-1371224808-view-0.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwqF5uLHOqRCpN_2Plyna4iQAua5yhc20UvQ&usqp=CAU',
  'https://img3.stockfresh.com/files/l/lightpoet/m/27/1802165_stock-photo-portrait-of-a-pretty-young-woman-listening-to-music.jpg',
  'https://images.ctfassets.net/bdyhigkzupmv/mXykmCsIrcI9vE34u0zfZ/a82a2aa31b801b4008dca2f4a4e9349c/hero-guitar-pop-rock.jpg',
  'https://image.shutterstock.com/mosaic_250/81539/681809980/stock-photo-a-group-of-musical-instruments-including-a-guitar-drum-keyboard-tambourine-681809980.jpg',
  'https://media.gettyimages.com/vectors/musical-note-waves-vector-id1165313764?s=612x612',
  'https://thumbs.dreamstime.com/z/funny-old-lady-listening-music-showing-thumbs-up-isolated-white-52466055.jpg',
  'https://c8.alamy.com/comp/2CA4P54/young-talented-man-holding-guitar-playing-music-for-friends-close-up-photo-2CA4P54.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQusw5Ob_5xr9JHFF9X6ifl3kYdGYayhc3bzQ&usqp=CAU',
]

const colorList = [
    '#F0F0F0',
    '#000000',
    '#BF1111',
    '#1B6C09',
    '#108C86',
    '#2250BF',
    '#9222BF',
    '#D3792E'
  ]

  
 const randomNumber = (max) => {
  return Math.floor(Math.random() * max)
}
  const randomColor = () => {
    return colorList[randomNumber(colorList.length)]
  }

const generateArtistArray = (num) => {
    let result = [];
    for (let i = 0; i < num; i++) {
      result.push({
        name: faker.lorem.words(3),
        customURL: `demo-${i}`,
        pictureURL: pictures[randomNumber(pictures.length - 1)],
        bannerURL: pictures[randomNumber(pictures.length - 1)],
        backgroundURL: pictures[randomNumber(pictures.length - 1)],
        pageColor: randomColor(),
        textColor: randomColor(),
        bio: faker.lorem.paragraph(),
        location: `${faker.address.cityName}, ${faker.address.stateName}`,
        userId: randomNumber(30) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    return result;
}

const artistArray = generateArtistArray(20);

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Artists', artistArray, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Artists', null, {});
  }
};
