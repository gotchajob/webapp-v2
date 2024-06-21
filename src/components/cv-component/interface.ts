
export interface CVTemplate {
  id: string;
  subject: string;
  status: boolean;
  name: string;
  personal: PersonalComponent[];
  layout: Column[];
}
export interface PersonalComponent {
  title: string;
  field: string;
  icon: string;
}
export interface Column {
  column: number;
  color: string;
  size: number;
  componentList: CVComponent[];
}
export interface CVComponent {
  header: string;
  color?: string;
  dataType: 'image' | 'information' | 'text';
  description: string;
}

export const CVTemplate: CVTemplate = {
  "id": "1",
  "name": "Kiet's CV",
  "status": true,
  "subject": "IT",
  "personal": [
    {
      "field": "name",
      "icon": "ic:baseline-person",
      "title": "Lý Anh Kiệt"
    },
    {
      "field": "birthday",
      "icon": "ic:baseline-calendar-month",
      "title": "19/01/2002"
    },
    {
      "field": "phone",
      "icon": "ic:baseline-phone",
      "title": "0123456789"
    },
    {
      "field": "email",
      "icon": "ic:baseline-email",
      "title": "kietly1901@gmail.com"
    }
  ],
  "layout": [
    {
      "color": "#59ABD9",
      "column": 0,
      "size": 0.5,
      "componentList": []
    },
    {
      "color": "#faf5f5",
      "column": 1,
      "size": 3.5,
      "componentList": [
        {
          "dataType": "image",
          "header": "Image",
          "description": "https://th.bing.com/th/id/R.41921164a5125add470627e30d1286cc?rik=FzPBS2DwEt5Dfw&pid=ImgRaw&r=0"
        },
        {
          "dataType": "information",
          "color": "#59ABD9",
          "header": "Personal Details",
          "description": "<p>This is the initial content of the editor.</p>"
        },
        {
          "dataType": "text",
          "color": "#59ABD9",
          "header": "<p>Skill</p>",
          "description": "<p><strong><span style=\"color: rgb(89, 171, 217);\">Skill A</span></strong>: &nbsp; Skill 1</p>\n<p><strong><span style=\"color: rgb(89, 171, 217);\">Skill B</span></strong>: &nbsp; Skill 2</p>\n<p><strong><span style=\"color: rgb(89, 171, 217);\">Skill C</span></strong>: &nbsp; Skill 3</p>"
        }
      ]
    },
    {
      "color": "#ffffff",
      "column": 2,
      "size": 8,
      "componentList": [
        {
          "dataType": "text",
          "color": "#59ABD9",
          "header": "<p>Profile</p>",
          "description": "<p>Profile Bio</p>"
        },
        {
          "dataType": "text",
          "color": "#59ABD9",
          "header": "Employment",
          "description": "<p><strong>Charg&eacute;e de client&egrave;le&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style=\"color:  rgb(89, 171, 217);\">Feb 2013 - May 2020</span></strong></p>\n          <p><span style=\"color:  rgb(89, 171, 217);\">Nanelle, Marseille</span></p>\n          <ul>\n          <li><span style=\"color: rgb(0, 0, 0);\">Gestion du portefeuille clients B2B France et international</span></li>\n          <li><span style=\"color: rgb(0, 0, 0);\">D&eacute;veloppement de la notori&eacute;t&eacute; de la marque : r&eacute;seaux sociaux, partenariat, concours</span></li>\n          <li><span style=\"color: rgb(0, 0, 0);\">Mise en place et d&eacute;veloppement de partenariats institutionnels et co-brandings</span></li>\n          <li><span style=\"color: rgb(0, 0, 0);\">Mise &agrave; jour des outils analytiques afin de mesurer la performance du service client</span></li>\n          </ul>\n          <p>&nbsp;</p>\n          <p><strong>Charg&eacute;e de client&egrave;le&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style=\"color:  rgb(89, 171, 217);\">Feb 2013 - May 2020</span></strong></p>\n          <p><span style=\"color:  rgb(89, 171, 217);\">Nanelle, Marseille</span></p>\n          <ul>\n          <li><span style=\"color: rgb(0, 0, 0);\">Gestion du portefeuille clients B2B France et international</span></li>\n          <li><span style=\"color: rgb(0, 0, 0);\">D&eacute;veloppement de la notori&eacute;t&eacute; de la marque : r&eacute;seaux sociaux, partenariat, concours</span></li>\n          <li><span style=\"color: rgb(0, 0, 0);\">Mise en place et d&eacute;veloppement de partenariats institutionnels et co-brandings</span></li>\n          <li><span style=\"color: rgb(0, 0, 0);\">Mise &agrave; jour des outils analytiques afin de mesurer la performance du service client</span></li>\n          </ul>"
        }
      ]
    }
  ]
}


// export const CVTemplate: CVTemplate = {
//   id: '1',
//   name: "Kiet's CV",
//   status: true,
//   subject: 'IT',
//   personal: [
//     {
//       field: 'name',
//       icon: 'ic:baseline-person',
//       title: 'Lý Anh Kiệt'
//     },
//     {
//       field: 'birthday',
//       icon: 'ic:baseline-calendar-month',
//       title: '19/01/2002'
//     },
//     {
//       field: 'phone',
//       icon: 'ic:baseline-phone',
//       title: '0123456789'
//     },
//     {
//       field: 'email',
//       icon: 'ic:baseline-email',
//       title: 'kietly1901@gmail.com'
//     }
//   ],
//   layout: [
//     {
//       color: '#59ABD9',
//       column: 0,
//       size: 0.5,
//       componentList: []
//     },
//     {
//       color: '#faf5f5',
//       column: 1,
//       size: 3.5,
//       componentList: [
//         {
//           dataType: 'image',
//           header: 'Image',
//           description: 'https://th.bing.com/th/id/R.41921164a5125add470627e30d1286cc?rik=FzPBS2DwEt5Dfw&pid=ImgRaw&r=0',
//         },
//         {
//           dataType: 'information',
//           color: '#59ABD9',
//           header: 'Personal Details',
//           description: '<p>This is the initial content of the editor.</p>',
//         },
//         {
//           dataType: 'text',
//           color: '#59ABD9',
//           header: 'Skill',
//           description: `<p><strong><span style="color: rgb(89, 171, 217);">Skill A</span></strong>: &nbsp; Skill 1</p>
//           <p><strong><span style="color: rgb(89, 171, 217);">Skill B</span></strong>: &nbsp; Skill 2</p>
//           <p><strong><span style="color: rgb(89, 171, 217);">Skill C</span></strong>: &nbsp; Skill 3</p>`,
//         }
//       ]
//     },
//     {
//       color: '#ffffff',
//       column: 2,
//       size: 8,
//       componentList: [
//         {
//           dataType: 'text',
//           color: '#59ABD9',
//           header: 'Profile',
//           description: `<p>Profile Bio</p>`,
//         },
//         {
//           dataType: 'text',
//           color: '#59ABD9',
//           header: 'Employment',
//           description: `<p><strong>Charg&eacute;e de client&egrave;le&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color:  rgb(89, 171, 217);">Feb 2013 - May 2020</span></strong></p>
//           <p><span style="color:  rgb(89, 171, 217);">Nanelle, Marseille</span></p>
//           <ul>
//           <li><span style="color: rgb(0, 0, 0);">Gestion du portefeuille clients B2B France et international</span></li>
//           <li><span style="color: rgb(0, 0, 0);">D&eacute;veloppement de la notori&eacute;t&eacute; de la marque : r&eacute;seaux sociaux, partenariat, concours</span></li>
//           <li><span style="color: rgb(0, 0, 0);">Mise en place et d&eacute;veloppement de partenariats institutionnels et co-brandings</span></li>
//           <li><span style="color: rgb(0, 0, 0);">Mise &agrave; jour des outils analytiques afin de mesurer la performance du service client</span></li>
//           </ul>
//           <p>&nbsp;</p>
//           <p><strong>Charg&eacute;e de client&egrave;le&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color:  rgb(89, 171, 217);">Feb 2013 - May 2020</span></strong></p>
//           <p><span style="color:  rgb(89, 171, 217);">Nanelle, Marseille</span></p>
//           <ul>
//           <li><span style="color: rgb(0, 0, 0);">Gestion du portefeuille clients B2B France et international</span></li>
//           <li><span style="color: rgb(0, 0, 0);">D&eacute;veloppement de la notori&eacute;t&eacute; de la marque : r&eacute;seaux sociaux, partenariat, concours</span></li>
//           <li><span style="color: rgb(0, 0, 0);">Mise en place et d&eacute;veloppement de partenariats institutionnels et co-brandings</span></li>
//           <li><span style="color: rgb(0, 0, 0);">Mise &agrave; jour des outils analytiques afin de mesurer la performance du service client</span></li>
//           </ul>`,
//         }
//       ]
//     }
//   ]
// };