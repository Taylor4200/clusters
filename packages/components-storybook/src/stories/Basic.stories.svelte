<script>
  import { StoryEventEmitter } from '../components/StoryEventEmitter.svelte';
</script>

<StoryEventEmitter>
  <div style="width: 100vw; height: 100vh; background: #1a1a1a; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: Arial, sans-serif;">
    <h1>Storybook is Working!</h1>
    <p>This is a basic test story using the StoryEventEmitter context.</p>
    <div style="margin-top: 20px; padding: 10px; background: #333; border-radius: 5px;">
      <p>✅ Storybook is running successfully</p>
      <p>✅ Components are rendering properly</p>
      <p>✅ Context providers are working</p>
    </div>
  </div>
</StoryEventEmitter>

