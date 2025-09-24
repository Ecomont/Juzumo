import S from '@sanity/desk-tool/structure-builder';
import { MdSettings, MdHome, MdLocalFlorist, MdLocalBar, MdArticle } from 'react-icons/md';

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .icon(MdSettings)
        .child(S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Home Hero')
        .icon(MdHome)
        .child(S.editor().id('hero').schemaType('hero').documentId('hero')),
      S.listItem()
        .title('Fruits')
        .icon(MdLocalFlorist)
        .child(S.documentTypeList('fruit').title('Fruits')),
      S.listItem()
        .title('Bars')
        .icon(MdLocalBar)
        .child(S.documentTypeList('bar').title('Bars')),
      S.listItem()
        .title('Reviews')
        .icon(MdArticle)
        .child(S.documentTypeList('reviewManual').title('Reviews')),
      S.listItem()
        .title('Blog Posts')
        .icon(MdArticle)
        .child(S.documentTypeList('post').title('Blog Posts')),
      S.divider(),
      S.listItem()
        .title('Preview')
        .child(S.documentList().title('Preview').filter('_type == "hero" || _type == "post"')),
    ]);