<script>
  import { StoryEventEmitter } from '../components/StoryEventEmitter.svelte';
  import Button from 'components-shared/src/components/Button.svelte';
</script>

<StoryEventEmitter>
  <div style="padding: 20px; background: #f5f5f5; min-height: 100vh;">
    <h2>Button Component Story</h2>
    
    <div style="margin: 20px 0;">
      <h3>Basic Button</h3>
      <Button>Click me!</Button>
    </div>
    
    <div style="margin: 20px 0;">
      <h3>Button with Different Styles</h3>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <Button>Primary</Button>
        <Button>Secondary</Button>
        <Button>Success</Button>
        <Button>Warning</Button>
        <Button>Error</Button>
      </div>
    </div>
    
    <div style="margin: 20px 0;">
      <h3>Button States</h3>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button>Loading...</Button>
      </div>
    </div>
  </div>
</StoryEventEmitter>

