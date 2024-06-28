import { loadGLTF } from "./libs/loader.js";
import { mockWithVideo } from './libs/camera-mock.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarConfigs = [
      {
        container: document.body,
        imageTargetSrc: '/static/assets/targets/aedici1.mind',
        modelPath: 'static/assets/models/aedici/aedici.glb',
        position: {x: 0, y: 0.20, z: 0},
        scale: {x: 0.25, y: 0.25, z: 0.25}
      },
      {
        container: document.body,
        imageTargetSrc: '/static/assets/targets/acecom.mind',
        modelPath: 'static/assets/models/acecom/acecom.glb',
        position: {x: 0, y: 0.15, z: 0},
        scale: {x: 0.20, y: 0.20, z: 0.20}
      },
      {
        container: document.body,
        imageTargetSrc: '/static/assets/targets/gem.mind',
        modelPath: 'static/assets/models/gem/gem.glb',
        position: {x: 0, y: 0, z: 0},
        scale: {x: 5, y: 5, z: 5}
      },
      {
        container: document.body,
        imageTargetSrc: '/static/assets/targets/fisicarecreativa.mind',
        modelPath: 'static/assets/models/recreativa/recreativa.glb',
        position: {x: 0, y: 0.20, z: 0},
        scale: {x: 0., y: 0.1, z: 0.1}
      }
    ];

    const startMindARInstance = async (config) => {
      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: config.container,
        imageTargetSrc: config.imageTargetSrc,
      });
      const {renderer, scene, camera} = mindarThree;

      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);

      const model = await loadGLTF(config.modelPath);
      model.scene.rotation.set(0, 0, 0);
      model.scene.scale.set(config.scale.x, config.scale.y, config.scale.z);
      model.scene.position.set(config.position.x, config.position.y, config.position.z);

      const anchor = mindarThree.addAnchor(0);
      anchor.group.add(model.scene);

      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    };

    for (const config of mindarConfigs) {
      await startMindARInstance(config);
    }
  };

  start();
});
