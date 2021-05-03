const express = require('express');
const router = express.Router();
const Manga = require('../models/mangaDB.js');


const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

// NEW ROUTE
  router.get('/new',(req,res) => {
    res.render(
      'new.ejs', { currentUser: req.session.currentUser })
  })
  // EDIT
  router.get('/:id/edit', (req, res) => {
    Manga.findById(req.params.id, (error, foundManga) => {
      res.render('./edit.ejs', {
        manga: foundManga,
  currentUser: req.session.currentUser

      })
    })
  })
// DELETE ROUTE
  router.delete('/:id',isAuthenticated,(req,res) => {
    Manga.findByIdAndRemove(req.params.id, (err, deleteManga) => {
      res.redirect('/mangadb')
    })
  })
// SHOW ROUTE
router.get('/:id', (req,res) => {
  Manga.findById(req.params.id, (error, foundManga) => {
    res.render('show.ejs',
    {
      manga: foundManga,
  currentUser: req.session.currentUser

    })
  })
})
// UPDATE
router.put('/:id', (req, res) => {
  Manga.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedModel) => {
      res.redirect('/mangadb')
    }
  )
})
// CREATE
router.post('/', (req, res) => {
Manga.create(req.body, (error, createdManga) => {
  res.redirect('/mangadb')
})
})

// INDEX ROUTE
router.get('/', isAuthenticated, (req, res) => {
    Manga.find({}, (error, allManga) => {
        res.render(
            'index.ejs',
            {
                mangas: allManga,
  currentUser: req.session.currentUser

            }
        )
    })
})
// SEED ROUTE
router.get('/setup/seed', (req,res) => {
    Manga.create(
    [
      {
        name:  'Berserk',
        description: 'Guts, a former mercenary now known as the "Black Swordsman," is out for revenge. After a tumultuous childhood, he finally finds someone he respects and believes he can trust, only to have everything fall apart when this person takes away everything important to Guts for the purpose of fulfilling his own desires. ',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/51/thumbnail.png',
        previewImg: 'https://d2lzb5v10mb0lj.cloudfront.net/common/salestools/previews/berserk_1/berserk_1p4.jpg',
        previewImg1: 'https://d2lzb5v10mb0lj.cloudfront.net/common/salestools/previews/berserk_1/berserk_1p1.jpg',
        previewImg2: '',
        author: 'Miura, Kentarou',
        link: 'https://mangaowl.net/single/51/berserk',
        released: 'Aug  25, 1989',
        rating: '9.31',
        views: '520,359',
        status: 'Ongoing',
      },
      {
        name: 'Tokyo Ghoul',
        description: 'Ken Kaneki, an unsuspecting university freshman, finds himself caught in a world between humans and ghouls when his date turns out to be a ghoul after his flesh. Barely surviving this encounter after being taken to a hospital, he discovers that he has turned into a half-ghoul as a result of the surgery he received. Unable to satisfy his intense craving for human meat through conventional means, Kaneki is taken in by friendly ghouls who run a coffee shop in order to help him with his transition. As he begins what he thinks will be a peaceful new life, little does he know that he is about to find himself at the center of a war between his new comrades and the forces of the CCG, and that his new existence has caught the attention of ghouls all over Tokyo.',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/132/thumbnail.png',
        previewImg: 'https://2.bp.blogspot.com/2aLPa95uiGbhuv4Eu50WTKF-5BnVvodIKiseSIOgmKqlFV8pBgmRJaugn5XjnDUebAJ39gaNh7KUViw=w700',
        author: 'Ishida, Sui',
        link: 'https://mangaowl.net/single/132/tokyo-ghoul?__cf_chl_jschl_tk__=405e60ad164be8a04b6adbf8548515d463c91511-1619789987-0-AVHo4YO5wO4cs14Bg4740GNm1PQr2S_iBPEHUl1FXO2pY6_8O8wLM2dGLgQn1VjAPp2f9zSxSJUWHf62NbBGg08GWVx9nHKDiGpkudj2zS9-jqFvfRZhIEyJn5JHBFMaFvJdWJmqKS--w-OCYaR7JiYBzx3KpdR5ClXErq76oLkUdyEerg6Rc20bU7RwMA9dQp4Zt9XzgVj2-y0Co1-HsgLE-lpnfnvc3zT0axcFlFMu7Jneb0yVrSLn_u9xab-O0QR3--MF7eJ_Blu1mUX9hlHA_6iqnrXsZzOkosBpdXyO_k6USP3oBwkBoHmqqvuTBxrz_z5v2VN2ESB25FR2FOemPH2gUtOfcLQK-s_TIKqHFcXo1aBabI3iedPJ8fDwfoWaMhOMvHlmQVF-4xrWvj0oU2sy-busCanfXcyKHJzStoVNSWiqIZyxh1kLQVnSejw6yIyyCh2YAXRJ9HErUMrXwjjahVQ9MEdgBaNqYDS2#',
        released: 'Sep 08, 2011',
        rating: '8.62',
        views: '160,938',
        status: 'Ongoing',
      },
      {
        name: 'D.Gray-man',
        description: 'Towards the end of the 19th century, Allen Walker officially joins the organization of Exorcists that destroy the beings known as Akuma—mechanic weapons made by the Millennium Earl with the suffering souls of the dead.',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/363/thumbnail.png',
        previewImg: 'https://2.bp.blogspot.com/X8NBQ6E9ejRWXu2V1o1TXB_pcBnS44Oaq63qj68icpxxQj6SrV4DE-_9clo8y7FLXl7EQWA8I4F5Kzs=w700',
        author: 'Hoshino, Katsura',
        link: 'https://mangaowl.net/single/363/d-gray-man',
        released: 'May 31, 2004',
        rating: '8.33',
        views: '85,676',
        status: 'Ongoing',
      },
      {
        name: 'Gantz',
        description: 'Thought your life was bad? Sometimes, death is worse. There is no salvation, peace, nor god waiting to receive you into their care. But wait, a god? Maybe you are talking about that big black ball stuck in the room with you. Now you are thrown into a game, fighting green aliens and robot monsters for the chance to survive.',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/614/thumbnail.png',
        previewImg: 'https://2.bp.blogspot.com/zuIalvVZfzPXg67xNASzTOf0ZTnNHAG5L3qmfZ-TzTKt2l7MuiZQ4a8k3UmknqI227PHLOKNXumspIU=w700',
        author: 'Oku, Hiroya',
        link: 'https://mangaowl.net/single/614/gantz',
        released: 'Jul 13, 2000',
        rating: '8.2',
        views: '193,675',
        status: 'Ongoing',
      },
      {
        name: 'Basara',
        description: 'Sarasa grew up knowing that her twin brother Tatara was prophesied to be the "boy of destiny," the one who would overthrow the oppressive government and unite the people.',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/189/thumbnail.png',
        previewImg: 'https://2.bp.blogspot.com/AzoznS8S5IIT6z29NTM8zKRWzwVURugF-Ecri6wzNkVY6tFHbTnb0kqslTg7Yz1YA0jDWjxlOevqru8=w700',
        author: 'Tamura, Yumi',
        link: 'https://mangaowl.net/single/MTg5/basara',
        released: 'Aug 11, 1990',
        rating: '8.49',
        views: '11,598',
        status: 'Ongoing',
      },
      {
        name: 'Yu☆Gi☆Oh!',
        description: 'Tenth grader Yuugi spent most of his time alone playing games—until he solved the Millennium Puzzle, a mysterious Egyptian artifact! Possessed by the puzzle, Yuugi becomes Yu-Gi-Oh, the King of Games, and challenges evil-doers to the Shadow Games—weird games with high stakes and high risks!',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/2889/thumbnail.png',
        previewImg: 'https://cdns4.mangaowl.com/tmp/Mqnww2iYyPApMNhWC3U8KBWYu8B083RdJK9uPhcA4XpU02Bh8SdFM94IIUbcQ5E/vSL0zqQos4g5TLQYkpICxGYYvhWmYW0TnPucFGzNtJo=',
        author: 'Takahashi, Kazuki',
        link: 'https://mangaowl.net/single/2889/yu-gi-oh-',
        released: 'Sep 17, 1996',
        rating: '7.61',
        views: '11,089',
        status: 'Ongoing',
      },
      {
        name: 'Hunter x Hunter',
        description: 'Hunters are a special breed, dedicated to tracking down treasures, magical beasts, and even other men. But such pursuits require a license, and less than one in a hundred thousand can pass the grueling qualification exam. Those who do pass gain access to restricted areas, amazing stores of information, and the right to call themselves Hunters.',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/100/thumbnail.png',
        previewImg: 'https://2.bp.blogspot.com/-LP_YMkIVNaZpdjwQooTZ5x08G1BhzRL0W6bCeqOZpzgdomvIaob_1E6DuLcKZzPTUTKPGPwFcc02bc=w700',
        author: 'Togashi, Yoshihiro',
        link: 'https://mangaowl.net/single/100/hunter-x-hunter',
        released: 'Mar 03, 1998',
        rating: '8.7',
        views: '369,329',
        status: 'Ongoing',
      },
      {
        name: 'Dragon Ball',
        description: 'Dragon Ball series follows the adventures of Son Goku from his childhood through adulthood as he trains in martial arts and explores the world in search of the seven mystical orbs known as the Dragon Balls, which can summon a wish-granting dragon when gathered. Along his journey, Goku makes several friends and battles a wide variety of villains, many of whom also seek the Dragon Balls for their own desires. Along the way becoming the strongest warrior in the universe. ',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/178/thumbnail.png',
        previewImg: 'https://img.mangaowl.net/tmp/qBy6I6I6AXacwfJO5e6MEV5jXLHbnW88QFzw4bAsrYoNBf45P8Bxlr7SFvlvJMVZJk10h0c4kqznf7Zxq+bTOcITeqVOjkn74+OS459425E=',
        author: 'Toriyama, Akira',
        link: 'https://mangaowl.net/single/178/dragon-ball',
        released: 'Nov 20, 1984',
        rating: '8.51',
        views: '49,002',
        status: 'Ongoing',
      },
      {
        name: 'Bleach',
        description: ' For as long as he can remember, high school student Ichigo Kurosaki has been able to see the spirits of the dead, but that has not stopped him from leading an ordinary life. One day, Ichigo returns home to find an intruder in his room who introduces herself as Rukia Kuchiki, a Soul Reaper tasked with helping souls pass over.',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/2172/thumbnail.png',
        previewImg: 'https://2.bp.blogspot.com/D1WHgjHpZSPepsEy_iJOgRYv_oNSisS7nQaDqpUcXwO_8T--15W5Es2uv8DL8B3A6_-l74SnqiHHxPA=w700',
        author: 'Kubo, Tite',
        link: 'https://mangaowl.net/single/2172/bleach',
        released: 'Aug 07, 2001',
        rating: '7.71',
        views: '116,179',
        status: 'Ongoing',
      },
      {
        name: 'Solo Leveling',
        description: 'My name is Sung Jin-Woo, an E-rank Hunter. Im someone who has to risk his life in the lowliest of dungeons, the "Worlds Weakest". Having no skills whatsoever to display, I barely earned the required money by fighting in low-leveled dungeons… at least until I found a hidden dungeon with the hardest difficulty within the D-rank dungeons! In the end, as I was accepting death, I suddenly received a strange power, a quest log that only I could see, a secret to leveling up that only I know about! If I trained in accordance with my quests and hunted monsters, my level would rise. Changing from the weakest Hunter to the strongest S-rank Hunter!',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/46730/thumbnail.png',
        previewImg: '',
        author: 'Sung-Lak Jang',
        link: 'https://mangaowl.net/single/46730/solo-leveling',
        released: 'Mar 04, 2018',
        rating: '9.64',
        views: '2,313,712',
        status: 'Ongoing',
      },
      {
        name: 'Jujutsu Kaisen',
        description: 'Yuuji is a genius at track and field. But he has zero interest running around in circles, hes happy as a clam in the Occult Research Club. Although hes only in the club for kicks, things get serious when a real spirit shows up at school! Lifes about to get really strange in Sugisawa Town #3 High School!',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/4107/thumbnail.png',
        previewImg: '',
        author: 'Gege, Akutami',
        link: 'https://mangaowl.net/single/4107/jujutsu-kaisen',
        released: 'Mar 05, 2018',
        rating: '7.46',
        views: '1,418,421',
        status: 'Ongoing',
      },
      {
        name: 'Black Clover',
        description: 'In a world full of magic, Asta—an orphan who is overly loud and energetic—possesses none whatsoever. Despite this, he dreams of becoming the Wizard King, a title bestowed upon the strongest mage in the Clover Kingdom. Possessing the same aspiration, Astas childhood friend and rival Yuno has been blessed with the ability to control powerful wind magic.',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/3291/thumbnail.png',
        previewImg: '',
        author: 'Tabata, Yuuki',
        link: 'https://mangaowl.net/single/3291/black-clover',
        released: 'Feb 16, 2015',
        rating: '7.56',
        views: '1,255,888',
        status: 'Ongoing',
      },
      {
        name: 'Kimetsu no Yaiba',
        description: 'Since ancient times, rumors have abounded of man-eating demons lurking in the woods. Because of this, the local townsfolk never venture outside at night. Legend has it that a demon slayer also roams the night, hunting down these bloodthirsty demons. For young Tanjirou, these rumors will soon to become his harsh reality...',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/1373/thumbnail.png',
        previewImg: '',
        author: 'Gotouge, Koyoharu',
        link: 'https://mangaowl.net/single/1373/kimetsu-no-yaiba',
        released: 'Feb 15, 2016',
        rating: '7.89',
        views: '1,223,546',
        status: 'Ongoing',
      },
      {
        name: 'One Piece',
        description: 'Gol D. Roger, a man referred to as the "Pirate King," is set to be executed by the World Government. But just before his demise, he confirms the existence of a great treasure, One Piece, located somewhere within the vast ocean known as the Grand Line. Announcing that One Piece can be claimed by anyone worthy enough to reach it, the Pirate King is executed and the Great Age of Pirates begins.',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/55/thumbnail.png',
        previewImg: '',
        author: 'Gotouge, Koyoharu',
        link: 'https://mangaowl.net/single/NTV6/one-piece',
        released: 'Jul 22, 1997',
        rating: '9.06',
        views: '1,080,582',
        status: 'Ongoing',
      },
      {
        name: 'One Punch Man',
        description: 'After rigorously training for three years, the ordinary Saitama has gained immense strength which allows him to take out anyone and anything with just one punch. He decides to put his new skill to good use by becoming a hero. However, he quickly becomes bored with easily defeating monsters, and wants someone to give him a challenge to bring back the spark of being a hero. Upon bearing witness to Saitamas amazing power, Genos, a cyborg, is determined to become Saitamas apprentice.',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/76/thumbnail.png',
        previewImg: '',
        author: 'Murata, Yusuke',
        link: 'https://mangaowl.net/single/76/one-punch-man',
        released: 'Jun 14, 2012',
        rating: '8.8',
        views: '1,442,054',
        status: 'Ongoing',
      },
      {
        name: 'Boku no Hero Academia',
        description: 'One day, a four-year-old boy came to a sudden realization: the world is not fair. Eighty percent of the worlds population wield special abilities, known as "quirks," which have given many the power to make their childhood dreams of becoming a superhero a reality. Unfortunately, Izuku Midoriya was one of the few born without a quirk, suffering from discrimination because of it. Yet, he refuses to give up on his dream of becoming a hero; determined to do the impossible, Izuku sets his sights on the elite hero training academy, UA High.',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/150/thumbnail.png',
        previewImg: '',
        author: 'Horikoshi, Kouhei',
        link: 'https://mangaowl.net/single/150/boku-no-hero-academia',
        released: 'Jul 07, 2014',
        rating: '8.57',
        views: '1,692,536',
        status: 'Ongoing',
      },
    ],
    (error,data) => {
      res.redirect('/mangadb')
    }
  )
})
module.exports = router;
