varying vec3 vPosition;
varying vec3 vNormal;
uniform float uTime;
uniform vec3 uColor;

void main() {
    float stripes = mod((vPosition.y - uTime * 0.05) * 20.0, 1.0);
    stripes = pow(stripes, 2.0);

    vec3 normal = normalize(vNormal);

    if (!gl_FrontFacing) {
        normal *= -1.0;
    }

    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - dot(normal , viewDir), 2.0);
    float holographic = stripes * fresnel;
    holographic += fresnel * 1.25;
    float falloff = smoothstep(0.8, 0.0, fresnel);
    holographic *= falloff;

    gl_FragColor = vec4(uColor, holographic);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}