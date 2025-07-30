<script lang="ts">
  export let value: number | string;
  export let className = '';
  export let style = '';

  // Sprite sheet config
  const charWidth = 60; // px
  const charHeight = 120; // px
  const order = ['0','1','2','3','4','5','6','7','8','9','X'];

  // Special case: if value is 11, show X
  $: isX = value === 11 || value === '11';
  $: digits = isX ? ['X'] : value.toString().split("");

  function getBgPos(digit) {
    const idx = order.indexOf(digit);
    if (idx === -1) return '0 0';
    return `-${idx * charWidth}px 0`;
  }
</script>

<span class={className} style={style}>
  {#each digits as digit, i}
    <span style="
      display: inline-block;
      width: {charWidth}px;
      height: {charHeight}px;
      background: url('/assets/numbers/numbers-sprite.png') no-repeat;
      background-size: {order.length * charWidth}px {charHeight}px;
      background-position: {getBgPos(digit)};
      vertical-align: middle;
      margin: 0 1px;
    "></span>
  {/each}
</span> 