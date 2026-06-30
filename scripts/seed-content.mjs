// Content import for TEAM Lipa (Zion Point Church).
// Usage (PowerShell):
//   $env:SANITY_WRITE_TOKEN="paste-editor-token"; node scripts/seed-content.mjs
// Get a token at: Sanity manage -> API -> Tokens -> Add API token (Editor).
// Revoke it afterwards once the import is done.

import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN env var. See instructions at top of file.");
  process.exit(1);
}

const client = createClient({
  projectId: "tydxrhwl",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  title: "TEAM Lipa (Zion Point Church)",
  tagline: "Connect to God. Connect to people.",
  address:
    "Block 13, Lot 16, St. Joseph Avenue, Villa de Lipa 1 Subdivision, Marauoy, Lipa City, Batangas 4217",
  email: "lipateamzion@gmail.com",
  phone: "0994 179 2218 (Min. Hannah Grace “Honey” Dela Cruz)",
  serviceTimes: [
    { _key: "st1", day: "Sunday", time: "10:00 AM", label: "Regular Sunday Service" },
    { _key: "st2", day: "Mon – Fri", time: "5:30 AM", label: "Early Morning Prayer" },
    { _key: "st3", day: "Women’s Fellowship", time: "Every other Saturday", label: "" },
    { _key: "st4", day: "Men’s Fellowship", time: "Every other Friday", label: "" },
  ],
  social: {
    facebook: "https://www.facebook.com/ZionPointChurch",
    youtube: "https://www.youtube.com/@TEAMLIPA",
    instagram: "https://www.instagram.com/teamzionlipa",
    tiktok: "https://www.tiktok.com/@zionpointchurch",
  },
  givingNote:
    "Online giving is coming soon. For now, you can give through:\n\n" +
    "GCash: 0905 523 4790 (Cecile Del Monte)\n" +
    "PSBank: 179110011773 (Zion Point Christian Church Inc.)\n\n" +
    "You may also give in person during our services. Thank you for your generosity!",
};

// ---- Portable Text helpers ----
let k = 0;
const key = () => `b${k++}`;
const span = (text, marks = []) => ({ _type: "span", _key: key(), text, marks });
const blk = (style, text, extra = {}) => ({
  _type: "block",
  _key: key(),
  style,
  markDefs: [],
  children: [span(text)],
  ...extra,
});
const h2 = (t) => blk("h2", t);
const h3 = (t) => blk("h3", t);
const p = (t) => blk("normal", t);
const li = (t) => blk("normal", t, { listItem: "bullet", level: 1 });
const linkPara = (pre, text, href, post = "") => {
  const lk = key();
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [{ _key: lk, _type: "link", href }],
    children: [span(pre), span(text, [lk]), span(post)],
  };
};

const aboutBody = [
  h2("Who We Are"),
  h3("Vision"),
  p("Zion Point Christian Church lives to connect to God and to connect to people."),
  h3("Mission"),
  p("Connect to God — We are blessed to be reconciled to God through Christ, and we desire to see Him be worshipped and glorified in everything we do."),
  p("Connect to People — We are privileged to be able to bring people into the same relationship. We make disciples by reaching out to the community, equipping lifelong learners and followers of Christ in a greater level of commitment, and commissioning faithful men and women of God who can lead people to Christ and teach the commands of God."),
  h3("Core Values"),
  li("Connect — To bring people to God"),
  li("Commit — To build people in Christ"),
  li("Commission — To be Spirit-empowered people"),

  h2("What We Believe"),
  h3("Salvation"),
  p("Only by trusting in Jesus Christ as God’s offer of forgiveness can anyone be saved from sin’s penalty. Salvation occurs when people place their faith in the death and resurrection of Christ as sufficient payment for their sin. Salvation is God’s free gift to us, and it cannot be earned through our own efforts."),
  h3("The Church"),
  p("The Church is a local community of baptized believers unified through faith in Christ. It is committed to the teachings of Christ and obeying all of His commands, and it seeks to bring the Gospel to the world. The Church works together in love and unity, intent on the ultimate purpose of glorifying Christ."),
  h3("Eternity"),
  p("People were created to exist forever. We will either exist eternally separated from God by sin or eternally with God through forgiveness and salvation. To be eternally separated from God is hell. To be eternally in union with Him is eternal life in Heaven. Heaven and Hell are real places of eternal existence."),
  h3("The Trinity"),
  p("God is the Creator and Ruler of the universe. He has eternally existed in three persons: the Father, the Son, and the Holy Spirit. These three are distinct from one another yet equally divine and one God."),
  p("The Father — God is far too great for us to fully understand: He is all powerful, all knowing, ever present, unchanging, completely worthy of our trust, and above all, Holy. We live, move, and exist because of Him. God is good. He is our Father — loving, compassionate, and faithful to His people and His promises."),
  p("The Son — Jesus Christ is the Son of God and co-equal with the Father and the Holy Spirit. Jesus lived a sinless human life and died on the cross as the perfect sacrifice for all people’s sins. He defeated death so that we can have life. He ascended to Heaven and will return again someday to earth to reign as King."),
  p("The Holy Spirit — The Holy Spirit is co-equal with the Father and the Son. Every believer receives Him upon placing their faith in Jesus Christ for salvation. He guides us into all truth, empowers us for godly living, comforts us, distributes spiritual gifts, and conforms us to the image of Christ. His indwelling presence assures us of our relationship with God."),
  h3("The Bible"),
  p("The Bible is the Word of God to us. It was written by human authors under the supernatural guidance of the Holy Spirit. It is the supreme source of truth for Christian beliefs and living. Because it is inspired by God, it is truth without error and is completely relevant to our daily lives."),
  h3("Man"),
  p("Man is made in the image of God and is the supreme object of His creation. Man was created to have fellowship with God but became separated in that relationship by an attitude of disobedience toward God called “sin.” As a result, man cannot attain a right relationship with God through his own effort."),

  h2("Our Story"),
  linkPara(
    "We’re still putting together a polished history, but you can ",
    "watch Pastor Romeo share how we became TEAM Lipa",
    "https://www.facebook.com/share/v/1A1CNcGhoY/",
    ".",
  ),
  p("The story of TEAM Zion Lipa begins in 1989, when Pastor Romeo Del Monte heard God’s audible call to discipleship. He joined Frontline Ministries, spending the next 20 years living in tents and trailers as he preached the gospel across the Philippines. During this season, he became part of the nation’s first Christian rock band and eventually rose to Assistant Director of the movement. It was also during these years that God blessed him with his wife, who shared his heart for ministry, and together they raised two daughters who would become integral to the family’s calling."),
  p("At age 40, Pastor Romeo felt God stirring a new desire in him to become a pastor. In 2009, the family relocated to Lipa City and joined Victory Church, where he completed his pastoral training. He later moved to the U.S., helping various churches strengthen their discipleship programs."),
  p("In 2016, the family stepped out to start an independent community Christian church. Soon after, Pastor Romeo was invited to serve with King’s Chapel, where he spent nearly five years as overseer of South Luzon. Once again sensing the Spirit’s leading toward a new step of faith, he and his family, alongside their church leaders, sought God’s direction together. This led to the founding of Zion Point in 2021."),
  p("The years from 2021 to 2025 brought growth, challenges, and deepened fellowship for the church family. Through prayer, God confirmed a new direction through Bishop Carding, leading the family and congregation to join TEAM."),
  p("Now, 2025 marks a new chapter for the church — a season of freedom and abundance. Much like Israel entering the Promised Land, TEAM Zion Point believes God is leading them into greater purpose, impact, and glory for His Kingdom. From the tents of the past to the Promised Land ahead, theirs is a story of faith, family, and fellowship — with the conviction that the best is still to come."),

  h2("Our Founders"),
  p("Pastor Romeo and Cecile Del Monte have been pastoring for 12 years and are the Founding and Lead Pastors of Zion Point Christian Church Inc. (est. 2021). They have an evangelistic gift and travel to different places within and outside of the Philippines."),
  p("From 1989 to 2009 they lived in tents and trailers, traveling to various islands in the Philippines and holding large and small gatherings to share the Good News."),
  p("Both Pastor Romeo and Pastor Cecile completed their biblical studies at the International School of Ministries (ISOM) and a degree in Bachelor of Arts in Theology at The Kairos Theological Seminary International. Pastor Romeo also attended the School of Local Church and Ministries in Every Nation. He is also a singer and composer who uses his talent to glorify the Lord. Pastor Romeo and Pastor Cecile are happily married and have two children, Hannah and Hazel."),

  h2("Board of Directors"),
  li("Romeo “Romy” L. Del Monte — President"),
  li("Cecile G. Del Monte"),
  li("Alan Michael Dumangeng — Treasurer"),
  li("Hannah Grace Dela Cruz — Corporate Secretary"),
];

const aboutPage = {
  _id: "page-about",
  _type: "page",
  title: "About TEAM Lipa",
  slug: { _type: "slug", current: "about" },
  body: aboutBody,
};

// ---- Core Leadership (shown as cards on the About page) ----
const leaders = [
  ["Romeo “Romy” L. Del Monte", "Senior Pastor"],
  ["Cecile G. Del Monte", "Senior Pastor"],
  ["Alan Michael Dumangeng", "Pastor"],
  ["Ruel Jr. “RJ” C. Katigbak", "Pastor"],
  ["Hazel Grace G. Del Monte", "Minister"],
  ["Hannah Grace Dela Cruz", "Minister"],
  ["Karen “Kars” Katigbak", "Minister"],
  ["Hannah Faye G. Del Monte", "Minister"],
];
const leaderDocs = leaders.map(([name, role], i) => ({
  _id: `leader-${i}`,
  _type: "leader",
  name,
  role,
  order: i,
}));

// ---- Ministries (with their heads) ----
const ministries = [
  ["Pastoral Care", "", "Caring for our church family through prayer, counsel, and support in every season.", "Alan Michael Dumangeng"],
  ["Worship", "", "Leading the congregation into God’s presence through music and praise.", "RJ & Karen Katigbak"],
  ["Hospitality", "", "Making everyone feel welcome and at home — from first-time guests to longtime members.", "Richard “Chie” Herrera"],
  ["Ushering", "", "Serving each gathering with order, warmth, and a helping hand.", "Raymond Bautista"],
  ["Youth Ministry", "For students", "A vibrant community where young people encounter God and grow together.", "Delo Sean Lloren"],
  ["Kids Ministry", "For children", "A safe, joyful place where children learn about Jesus through worship, stories, and play.", "Rose Lloren"],
  ["Evangelism", "", "Sharing the good news of Jesus with our community and beyond.", "Hazel Grace G. Del Monte"],
  ["Discipleship", "", "Helping believers grow as lifelong followers of Christ.", "Hannah Grace Dela Cruz"],
  ["Media & IT", "", "Telling our story and supporting ministry through media and technology.", "Febrj Kalalo"],
];
const ministryDocs = ministries.map(([name, audience, description, leader], i) => ({
  _id: `ministry-${i}`,
  _type: "ministry",
  name,
  audience: audience || undefined,
  description,
  leader: `Led by ${leader}`,
  order: i,
}));

// Merge-write: only sets the fields we manage, so Studio-managed fields
// (mapEmbedUrl, logo, heroImage, gallery, leader/ministry photos, liveNow…)
// are NEVER wiped by an import. Avoids the full-document replace footgun.
async function setDoc(doc) {
  const { _id, _type, ...rest } = doc;
  const fields = Object.fromEntries(
    Object.entries(rest).filter(([, v]) => v !== undefined),
  );
  await client.createIfNotExists({ _id, _type });
  await client.patch(_id).set(fields).commit();
}

async function run() {
  console.log("Importing Site Settings (merge)...");
  await setDoc(siteSettings);
  console.log("Importing About page...");
  await setDoc(aboutPage);
  console.log(`Importing ${leaderDocs.length} leaders...`);
  for (const doc of leaderDocs) await setDoc(doc);
  console.log(`Importing ${ministryDocs.length} ministries...`);
  for (const doc of ministryDocs) await setDoc(doc);
  console.log("\n✅ Done. Published content for TEAM Lipa (Zion Point Church).");
  console.log("Live site should update within ~60 seconds.");
}

run().catch((err) => {
  console.error("Import failed:", err.message);
  process.exit(1);
});
