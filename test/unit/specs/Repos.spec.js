import Vue from 'vue';
import Repos from '@/components/Repos.vue';
import sinon from 'sinon';

describe('Repos.vue', () => {
  let clock = null;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should render correct contents', (done) => {
    const Constructor = Vue.extend(Repos);
    const vm = new Constructor().$mount();
    expect(vm.$data.repos.length).equals(0);
    vm.findrepos().then(() => {
      expect(vm.$data.repos.length).equals(3);
      const tr = vm.$el.querySelectorAll('tbody tr');
      // console.log(tr);
      // expect(tr.length).equals(3);
      // TODO: entender qual o problema desse assert
      done();
    });
    clock.tick(1000);
  });
});
