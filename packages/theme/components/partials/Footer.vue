<template>
  <v-footer
    color="#61686d"
    padless
  >
    <v-card
      flat
      tile
      width="100%"
      class="menu-footer lighten-1 text-center"
    >
      <v-card-text class="submenu-footer">
        <v-container>
          <v-row no-gutters>
            <v-col lg="4" md="6" align="left">
              <span class="font-bold text-lg mb-10">Product Category</span>
              <div class="mt-5">
                <li v-for="(category,i) in categories" :key="i" :to="category.to" class="menus">
                  {{category.title}}
                </li>
              </div>
            </v-col>
            <v-col lg="4" md="6" align="left">
              <span class="font-bold text-lg">Mitraruma</span>
              <div class="mt-5">
                <li v-for="(menu,i) in menus" :key="i" :to="menu.to" class="menus">{{menu.title}}</li>
              </div>
            </v-col>
            <v-col lg="4" md="12" align="left">
              <span class="font-bold text-lg mb-10">Connect with us</span>
              <div class="mt-5 mb-5">
                <v-btn
                  class="mx-4"
                  color="red"
                  icon
                >
                  <v-icon size="48px">mdi-facebook</v-icon>
                </v-btn>
                <v-btn
                  class="mx-4"
                  color="red"
                  fab
                  dark
                  small
                >
                  <v-icon size="24px">mdi-instagram</v-icon>
                </v-btn>
                <v-btn class="mx-4" color="red" fab dark small>
                  <v-icon size="24px">mdi-youtube</v-icon>
                </v-btn>
              </div>
              <div>
                <span class="text-lg">Email: cs@mitraruma.com</span>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider/>

      <v-card-text class="white--text">
        &copy; Copyright {{new Date().getFullYear()}} mitraruma.com, All Rights Reserved.
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      menus: [
        {
          'title':'About Us',
          'to':'/'
        },{
          'title':'Blog',
          'to':'/'
        },{
          'title':'Room Scene',
          'to':'/'
        },{
          'title':'VDO Testimonial',
          'to':'/'
        },{
          'title':'Payment confirmation',
          'to':'/'
        },{
          'title':'Terms & Conditions',
          'to':'/'
        },{
          'title':'Privacy Policy',
          'to':'/'
        },{
          'title':'Cookies Policy',
          'to':'/'
        },
      ],
      categories: [
        {
          'title':'Cement & Concrete',
          'to':'/'
        },{
          'title':'Kitchen',
          'to':'/'
        },{
          'title':'Packages & Services',
          'to':'/'
        },{
          'title':'Furniture',
          'to':'/'
        },{
          'title':'Home Improvement',
          'to':'/'
        },{
          'title':'Floor & Wall',
          'to':'/'
        },{
          'title':'Bathroom',
          'to':'/'
        },{
          'title':'Roof',
          'to':'/'
        },{
          'title':'Outdoor',
          'to':'/'
        },{
          'title':'Bedroom',
          'to':'/'
        }
      ],
    }),
  }
</script>
<style scoped>
  .menu-footer {
    background-color: #61686d;
  }

  .submenu-footer {
    background-color: #f0f0f0;
  }
  .menus{
    padding: 9px 0 9px 0;
    cursor: pointer;
    list-style-type: none;
  }
</style>
