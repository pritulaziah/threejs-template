varying vec3 vNormal;
varying vec3 vPosition;
uniform float uTime;

#include ./utils/random2D.glsl;

void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    float glitchTime = uTime - worldPosition.y;
    float glitchStrength = sin(glitchTime) + sin(glitchTime * 3.45) +  sin(glitchTime * 8.76);
    glitchStrength /= 3.0;
    glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
    glitchStrength *= 0.25;
    worldPosition.x += (random2D(worldPosition.xz + uTime) - 0.5) * glitchStrength;
    worldPosition.z += (random2D(worldPosition.zx + uTime) - 0.5) * glitchStrength;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;

    vPosition = worldPosition.xyz;
    vNormal = normal;
}