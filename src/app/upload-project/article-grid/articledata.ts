import {Article} from '../../models/article.model';

export const craftsmanshipArticles = [
  new Article(
    'Mastering the Craft of Software Development',
    'I am not a master of software engineering, but I hope this post marks the beginning of a new phase in that journey.  After spending much of the last two years in the trenches getting my hands dirty with code and exploring topics of theoretical computer science, I find myself wondering some new basic yet important questions: what is good code?  What is the value system that informs the practices of a software engineer? What rules should be followed to ensure software is maintainable and scalable?  This is about going beyond writing code that simply works and achieving mastery over the craft of software development.  There are a few books that professionals and academics alike tend to recommend for those who endeavour to master their craft.  Jon Bently’s”Programming Perls”,  Steve McConnell’s “Code Complete 2″, and Peter Seibel’s ” Coders at Work: Reflections on the Craft of Programming” to name a few.  Though I aspire to work through all of these top-notch books, this upload-project begins with a series of discussions and thoughts on Robert C. Martin’s “Clean Code.”',
    'Clean Code',
    'I am not a master of software engineering, but this first post marks the beginning of a new phase in that journey...',
    ['Software Craftsmanship', 'Clean Code'],
    'Hector Garcia',
    new Date().toISOString()
  )
];
