import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  github: Ember.inject.service(),

  model() {
    const requests = [
      this.get('github').request('orgs/emberjs'),
      this.get('github').request('orgs/ciena-blueplanet')
    ];

    return RSVP.all(requests)
      .catch((e) => {
        console.log(e);
      });

    // return [
    //   Ember.Object.create({ id: 1, name: 'Org 1' }),
    //   Ember.Object.create({ id: 2, name: 'Org 2' })
    // ];
  },

  // if you need something after model has resolve
  // afterModel(model) {
    // get a property from model and make another request
    // return this.get('ajax').request(somethingElse)
  // }

  actions: {
    star(organization) {
      // if we aren't sure its an ember object
      const isStarred = Ember.get(organization, 'isStarred');
      Ember.set(organization, 'isStarred', !isStarred);

      // if we have ember object
      // organization.set('isStarred', true);
      // organization.toggleProperty('isStarred');
    }
  }
});
