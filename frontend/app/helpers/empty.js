import { helper } from '@ember/component/helper';

export default helper(function empty(params) {
  const [array] = params;
  return array.length === 0;
});
