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
        previewImg: 'https://2.bp.blogspot.com/tnSHshTfWl2PscudjF0OLiMzLh-GXFXmc_Pi5hLAOWHpW9UfDWrL3qMTrboE2vq_XpF4EeQoz7I7EKs=w700',
        author: 'Miura, Kentarou',
        link: 'https://mangaowl.net/single/51/berserk',
      },
      {
        name: 'Tokyo Ghoul',
        description: 'Ken Kaneki, an unsuspecting university freshman, finds himself caught in a world between humans and ghouls when his date turns out to be a ghoul after his flesh. Barely surviving this encounter after being taken to a hospital, he discovers that he has turned into a half-ghoul as a result of the surgery he received. Unable to satisfy his intense craving for human meat through conventional means, Kaneki is taken in by friendly ghouls who run a coffee shop in order to help him with his transition. As he begins what he thinks will be a peaceful new life, little does he know that he is about to find himself at the center of a war between his new comrades and the forces of the CCG, and that his new existence has caught the attention of ghouls all over Tokyo.',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/132/thumbnail.png',
        previewImg: 'https://2.bp.blogspot.com/2aLPa95uiGbhuv4Eu50WTKF-5BnVvodIKiseSIOgmKqlFV8pBgmRJaugn5XjnDUebAJ39gaNh7KUViw=w700',
        author: 'Ishida, Sui',
        link: 'https://mangaowl.net/single/132/tokyo-ghoul?__cf_chl_jschl_tk__=405e60ad164be8a04b6adbf8548515d463c91511-1619789987-0-AVHo4YO5wO4cs14Bg4740GNm1PQr2S_iBPEHUl1FXO2pY6_8O8wLM2dGLgQn1VjAPp2f9zSxSJUWHf62NbBGg08GWVx9nHKDiGpkudj2zS9-jqFvfRZhIEyJn5JHBFMaFvJdWJmqKS--w-OCYaR7JiYBzx3KpdR5ClXErq76oLkUdyEerg6Rc20bU7RwMA9dQp4Zt9XzgVj2-y0Co1-HsgLE-lpnfnvc3zT0axcFlFMu7Jneb0yVrSLn_u9xab-O0QR3--MF7eJ_Blu1mUX9hlHA_6iqnrXsZzOkosBpdXyO_k6USP3oBwkBoHmqqvuTBxrz_z5v2VN2ESB25FR2FOemPH2gUtOfcLQK-s_TIKqHFcXo1aBabI3iedPJ8fDwfoWaMhOMvHlmQVF-4xrWvj0oU2sy-busCanfXcyKHJzStoVNSWiqIZyxh1kLQVnSejw6yIyyCh2YAXRJ9HErUMrXwjjahVQ9MEdgBaNqYDS2#',
      },
      {
        name: 'D.Gray-man',
        description: 'Towards the end of the 19th century, Allen Walker officially joins the organization of Exorcists that destroy the beings known as Akuma—mechanic weapons made by the Millennium Earl with the suffering souls of the dead.',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/363/thumbnail.png',
        previewImg: 'https://2.bp.blogspot.com/X8NBQ6E9ejRWXu2V1o1TXB_pcBnS44Oaq63qj68icpxxQj6SrV4DE-_9clo8y7FLXl7EQWA8I4F5Kzs=w700',
        author: 'Hoshino, Katsura',
        link: 'https://mangaowl.net/single/363/d-gray-man',
      },
      {
        name: 'Gantz',
        description: 'Thought your life was bad? Sometimes, death is worse. There is no salvation, peace, nor god waiting to receive you into their care. But wait, a god? Maybe you are talking about that big black ball stuck in the room with you. Now you are thrown into a game, fighting green aliens and robot monsters for the chance to survive.',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/614/thumbnail.png',
        previewImg: 'https://2.bp.blogspot.com/zuIalvVZfzPXg67xNASzTOf0ZTnNHAG5L3qmfZ-TzTKt2l7MuiZQ4a8k3UmknqI227PHLOKNXumspIU=w700',
        author: 'Oku, Hiroya',
        link: 'https://mangaowl.net/single/614/gantz',
      },
      {
        name: 'Basara',
        description: 'Sarasa grew up knowing that her twin brother Tatara was prophesied to be the "boy of destiny," the one who would overthrow the oppressive government and unite the people.',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/189/thumbnail.png',
        previewImg: 'https://2.bp.blogspot.com/AzoznS8S5IIT6z29NTM8zKRWzwVURugF-Ecri6wzNkVY6tFHbTnb0kqslTg7Yz1YA0jDWjxlOevqru8=w700',
        author: 'Tamura, Yumi',
        link: 'https://mangaowl.net/single/MTg5/basara',
      },
      {
        name: 'Yu☆Gi☆Oh!',
        description: 'Tenth grader Yuugi spent most of his time alone playing games—until he solved the Millennium Puzzle, a mysterious Egyptian artifact! Possessed by the puzzle, Yuugi becomes Yu-Gi-Oh, the King of Games, and challenges evil-doers to the Shadow Games—weird games with high stakes and high risks!',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/2889/thumbnail.png',
        previewImg: 'https://cdns4.mangaowl.com/tmp/Mqnww2iYyPApMNhWC3U8KBWYu8B083RdJK9uPhcA4XpU02Bh8SdFM94IIUbcQ5E/vSL0zqQos4g5TLQYkpICxGYYvhWmYW0TnPucFGzNtJo=',
        author: 'Takahashi, Kazuki',
        link: 'https://mangaowl.net/single/2889/yu-gi-oh-',
      },
      {
        name: 'Hunter x Hunter',
        description: 'Hunters are a special breed, dedicated to tracking down treasures, magical beasts, and even other men. But such pursuits require a license, and less than one in a hundred thousand can pass the grueling qualification exam. Those who do pass gain access to restricted areas, amazing stores of information, and the right to call themselves Hunters.',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/100/thumbnail.png',
        previewImg: 'https://2.bp.blogspot.com/-LP_YMkIVNaZpdjwQooTZ5x08G1BhzRL0W6bCeqOZpzgdomvIaob_1E6DuLcKZzPTUTKPGPwFcc02bc=w700',
        author: 'Togashi, Yoshihiro',
        link: 'https://mangaowl.net/single/100/hunter-x-hunter',
      },
      {
        name: 'Dragon Ball',
        description: 'Dragon Ball series follows the adventures of Son Goku from his childhood through adulthood as he trains in martial arts and explores the world in search of the seven mystical orbs known as the Dragon Balls, which can summon a wish-granting dragon when gathered. Along his journey, Goku makes several friends and battles a wide variety of villains, many of whom also seek the Dragon Balls for their own desires. Along the way becoming the strongest warrior in the universe. ',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/178/thumbnail.png',
        previewImg: 'https://img.mangaowl.net/tmp/qBy6I6I6AXacwfJO5e6MEV5jXLHbnW88QFzw4bAsrYoNBf45P8Bxlr7SFvlvJMVZJk10h0c4kqznf7Zxq+bTOcITeqVOjkn74+OS459425E=',
        author: 'Toriyama, Akira',
        link: 'https://mangaowl.net/single/178/dragon-ball',
      },
      {
        name: 'Bleach',
        description: ' For as long as he can remember, high school student Ichigo Kurosaki has been able to see the spirits of the dead, but that has not stopped him from leading an ordinary life. One day, Ichigo returns home to find an intruder in his room who introduces herself as Rukia Kuchiki, a Soul Reaper tasked with helping souls pass over.',
        posterImg: 'https://img.mostraveller.com/uploads/images/comics/2172/thumbnail.png',
        previewImg: 'https://2.bp.blogspot.com/D1WHgjHpZSPepsEy_iJOgRYv_oNSisS7nQaDqpUcXwO_8T--15W5Es2uv8DL8B3A6_-l74SnqiHHxPA=w700',
        author: 'Kubo, Tite',
        link: 'https://mangaowl.net/single/2172/bleach',
      }
    ],
    (error,data) => {
      res.redirect('/mangadb')
    }
  )
})
module.exports = router;
