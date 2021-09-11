import { Component } from '@angular/core';

@Component({
  selector: 'app-genealogy',
  templateUrl: './genealogy.component.html',
  styleUrls: ['./genealogy.component.sass'],
})
export class GenealogyComponent {
  nodes: any = [
    {
      name: 'Reggie Campomanes',
      cssClass: 'ngx-org-ceo',
      image: 'assets/node.svg',
      title: 'Manila, City',
      childs: [
        {
          name: 'Darwin Vargas',
          cssClass: 'ngx-org-ceo',
          image: 'assets/node.svg',
          title: 'Manila City',
          childs: [
            {
              name: 'John Smith',
              cssClass: 'ngx-org-head',
              image: 'assets/node.svg',
              title: 'Naic, Cavite',
              childs: [],
            },
            {
              name: 'Tulfo Edren',
              cssClass: 'ngx-org-vp',
              image: 'assets/node.svg',
              title: 'Laguna',
              childs: [],
            },
          ],
        },
        {
          name: 'Jerico Villaraza',
          cssClass: 'ngx-org-ceo',
          image: 'assets/node.svg',
          title: 'Manila City',
          childs: [
            {
              name: 'Beau Avril',
              cssClass: 'ngx-org-head',
              image: 'assets/node.svg',
              title: 'Naic, Cavite',
              childs: [],
            },
            {
              name: 'Tara Walpert Levy',
              cssClass: 'ngx-org-vp',
              image: 'assets/node.svg',
              title: 'Cebu City',
              childs: [
                {
                  name: 'Johnson Eleem',
                  cssClass: 'ngx-org-ceo',
                  image: 'assets/node.svg',
                  title: 'Tagaytay',
                  childs: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}
