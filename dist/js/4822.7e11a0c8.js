"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[4822],{1215:function(e,t,r){r.d(t,{D:function(){return j},b:function(){return $}});var n=r(13030),i=r(37072),o=r(26671),a=r(78306),s=r(15508),l=r(40443),c=r(50859),u=r(70953),d=r(12195),h=r(96524),f=r(74520),m=r(35941),p=r(8982),v=r(7304),g=r(94836),_=r(49256),x=r(62001),T=r(72931),b=r(12815),A=r(71448),S=r(75335),y=r(67235),O=r(95190),C=r(27424),E=r(6065),w=r(54335),M=r(21154),I=r(14795),R=r(19889),N=r(25217),L=r(1898),P=r(35525),H=r(24923),D=r(4128),F=r(45804),V=r(80545),B=r(97944),z=r(40275),U=r(72325),W=r(47613),G=r(26723),k=r(6360);function $(e){const t=new U.N5,{vertex:r,fragment:$,varyings:j}=t;if((0,P.NB)(r,e),t.include(f.I),j.add("vpos","vec3"),t.include(I.A,e),t.include(d.B,e),t.include(_.G,e),e.hasColorTextureTransform&&t.include(M.q2),e.output===l.V.Color||e.output===l.V.Alpha){e.hasNormalTextureTransform&&t.include(M.Sx),e.hasEmissionTextureTransform&&t.include(M.MU),e.hasOcclusionTextureTransform&&t.include(M.O1),e.hasMetallicRoughnessTextureTransform&&t.include(M.QM),(0,P.yu)(r,e),t.include(h.Y,e),t.include(u.d,e);const l=e.normalType===h.W.Attribute||e.normalType===h.W.Compressed;l&&e.offsetBackfaces&&t.include(s.M),t.include(T.W,e),t.include(g.Mh,e),e.instancedColor&&t.attributes.add(k.r.INSTANCECOLOR,"vec4"),j.add("vPositionLocal","vec3"),t.include(p.U,e),t.include(a.oD,e),t.include(m.K,e),t.include(v.c,e),r.uniforms.add(new D.E("externalColor",(e=>e.externalColor))),j.add("vcolorExt","vec4"),e.hasMultipassTerrain&&j.add("depth","float");const c=e.hasModelTransformation;if(c){const e=(0,i.c)();r.uniforms.add(new z.X("model",(e=>e.modelTransformation??o.I))),r.uniforms.add(new B.k("normalTransform",(t=>((0,n.b)(e,t.modelTransformation??o.I),e))))}r.code.add(V.H`
      void main(void) {
        forwardNormalizedVertexColor();
        vcolorExt = externalColor;
        ${e.instancedColor?"vcolorExt *= instanceColor * 0.003921568627451;":""}
        vcolorExt *= vvColor();
        vcolorExt *= getSymbolColor();
        forwardColorMixMode();

        if (vcolorExt.a < ${V.H.float(R.y)}) {
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        } else {
          vpos = calculateVPos();
          ${c?"vpos = (model * vec4(vpos, 1.0)).xyz;":""}
          vPositionLocal = vpos - view[3].xyz;
          vpos = subtractOrigin(vpos);
          ${l?V.H`vNormalWorld = ${c?"normalize(normalTransform * dpNormal(vvLocalNormal(normalModel())))":"dpNormal(vvLocalNormal(normalModel()))"};`:""}
          vpos = addVerticalOffset(vpos, localOrigin);
          ${e.hasVertexTangents?"vTangent = dpTransformVertexTangent(tangent);":""}
          gl_Position = transformPosition(proj, view, vpos);
          ${l&&e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
        }

        ${e.hasMultipassTerrain?"depth = (view * vec4(vpos, 1.0)).z;":""}
        forwardLinearDepth();
        forwardTextureCoordinates();
        ${e.hasColorTextureTransform?V.H`forwardColorUV();`:""}
        ${e.hasNormalTextureTransform?V.H`forwardNormalUV();`:""}
        ${e.hasEmissionTextureTransform?V.H`forwardEmissiveUV();`:""}
        ${e.hasOcclusionTextureTransform?V.H`forwardOcclusionUV();`:""}
        ${e.hasMetallicRoughnessTextureTransform?V.H`forwardMetallicRoughnessUV();`:""}
      }
    `)}switch(e.output){case l.V.Alpha:t.include(c.HQ,e),t.include(N.S,e),t.include(y.Q,e),$.uniforms.add(new F.m("opacity",(e=>e.opacity)),new F.m("layerOpacity",(e=>e.layerOpacity))),e.hasColorTexture&&$.uniforms.add(new W.N("tex",(e=>e.texture))),$.include(L.N),$.code.add(V.H`
      void main() {
        discardBySlice(vpos);
        ${e.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}
        ${e.hasColorTexture?V.H`
                vec4 texColor = texture(tex, ${e.hasColorTextureTransform?V.H`colorUV`:V.H`vuv0`});
                ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:V.H`vec4 texColor = vec4(1.0);`}
        ${e.hasVertexColors?V.H`float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:V.H`float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        fragColor = vec4(opacity_);
      }
    `);break;case l.V.Color:t.include(c.HQ,e),t.include(A.kA,e),t.include(b.n,e),t.include(N.S,e),t.include(e.instancedDoublePrecision?w.G:w.Bz,e),t.include(y.Q,e),(0,P.yu)($,e),$.uniforms.add(r.uniforms.get("localOrigin"),new H.t("ambient",(e=>e.ambient)),new H.t("diffuse",(e=>e.diffuse)),new F.m("opacity",(e=>e.opacity)),new F.m("layerOpacity",(e=>e.layerOpacity))),e.hasColorTexture&&$.uniforms.add(new W.N("tex",(e=>e.texture))),t.include(E._Z,e),t.include(C.c,e),$.include(L.N),t.include(O.r,e),(0,A.a8)($),(0,A.eU)($),(0,S.O4)($),$.code.add(V.H`
      void main() {
        discardBySlice(vpos);
        ${e.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}
        ${e.hasColorTexture?V.H`
                vec4 texColor = texture(tex, ${e.hasColorTextureTransform?V.H`colorUV`:V.H`vuv0`});
                ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:V.H`vec4 texColor = vec4(1.0);`}
        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        ${e.normalType===h.W.ScreenDerivative?V.H`
                vec3 normal = screenDerivativeNormal(vPositionLocal);`:V.H`
                shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
        ${e.pbrMode===E.A9.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        vec3 posWorld = vpos + localOrigin;

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        float shadow = ${e.receiveShadows?"readShadowMap(vpos, linearDepth)":e.spherical?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};

        vec3 matColor = max(ambient, diffuse);
        ${e.hasVertexColors?V.H`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:V.H`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${e.hasNormalTexture?V.H`
                mat3 tangentSpace = ${e.hasVertexTangents?"computeTangentSpace(normal);":"computeTangentSpace(normal, vpos, vuv0);"}
                vec3 shadingNormal = computeTextureNormal(tangentSpace, ${e.hasNormalTextureTransform?V.H`normalUV`:"vuv0"});`:V.H`vec3 shadingNormal = normal;`}
        vec3 normalGround = ${e.spherical?V.H`normalize(posWorld);`:V.H`vec3(0.0, 0.0, 1.0);`}

        ${e.snowCover?V.H`
                float snow = smoothstep(0.5, 0.55, dot(normal, normalGround));
                albedo = mix(albedo, vec3(1), snow);
                shadingNormal = mix(shadingNormal, normal, snow);
                ssao = mix(ssao, 1.0, snow);`:""}

        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

        ${e.pbrMode===E.A9.Normal||e.pbrMode===E.A9.Schematic?V.H`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${e.snowCover?V.H`
                        mrr = mix(mrr, vec3(0.0, 1.0, 0.04), snow);
                        emission = mix(emission, vec3(0.0), snow);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:V.H`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        fragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.transparencyPassType===G.y.Color?V.H`fragColor = premultiplyAlpha(fragColor);`:""}
      }
    `)}return t.include(x.E,e),t}const j=Object.freeze(Object.defineProperty({__proto__:null,build:$},Symbol.toStringTag,{value:"Module"}))},77084:function(e,t,r){r.d(t,{R:function(){return F},b:function(){return D}});var n=r(78306),i=r(15508),o=r(40443),a=r(50859),s=r(70953),l=r(12195),c=r(96524),u=r(74520),d=r(35941),h=r(8982),f=r(7304),m=r(49256),p=r(62001),v=r(12815),g=r(71448),_=r(75335),x=r(67235),T=r(27424),b=r(6065),A=r(54335),S=r(14795),y=r(19889),O=r(25217),C=r(1898),E=r(35525),w=r(24923),M=r(4128),I=r(45804),R=r(80545),N=r(72325),L=r(47613),P=r(26723),H=r(6360);function D(e){const t=new N.N5,{vertex:r,fragment:D,varyings:F}=t;return(0,E.NB)(r,e),t.include(u.I),F.add("vpos","vec3"),t.include(S.A,e),t.include(l.B,e),t.include(m.G,e),e.output!==o.V.Color&&e.output!==o.V.Alpha||((0,E.yu)(t.vertex,e),t.include(c.Y,e),t.include(s.d,e),e.offsetBackfaces&&t.include(i.M),e.instancedColor&&t.attributes.add(H.r.INSTANCECOLOR,"vec4"),F.add("vNormalWorld","vec3"),F.add("localvpos","vec3"),e.hasMultipassTerrain&&F.add("depth","float"),t.include(h.U,e),t.include(n.oD,e),t.include(d.K,e),t.include(f.c,e),r.uniforms.add(new M.E("externalColor",(e=>e.externalColor))),F.add("vcolorExt","vec4"),r.code.add(R.H`
        void main(void) {
          forwardNormalizedVertexColor();
          vcolorExt = externalColor;
          ${e.instancedColor?"vcolorExt *= instanceColor * 0.003921568627451;":""}
          vcolorExt *= vvColor();
          vcolorExt *= getSymbolColor();
          forwardColorMixMode();

          if (vcolorExt.a < ${R.H.float(y.y)}) {
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          } else {
            vpos = calculateVPos();
            localvpos = vpos - view[3].xyz;
            vpos = subtractOrigin(vpos);
            vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            ${e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
          }
          ${e.hasMultipassTerrain?R.H`depth = (view * vec4(vpos, 1.0)).z;`:""}
          forwardLinearDepth();
          forwardTextureCoordinates();
        }
      `)),e.output===o.V.Alpha&&(t.include(a.HQ,e),t.include(O.S,e),t.include(x.Q,e),D.uniforms.add(new I.m("opacity",(e=>e.opacity)),new I.m("layerOpacity",(e=>e.layerOpacity))),e.hasColorTexture&&D.uniforms.add(new L.N("tex",(e=>e.texture))),D.include(C.N),D.code.add(R.H`
      void main() {
        discardBySlice(vpos);
        ${e.hasMultipassTerrain?R.H`terrainDepthTest(gl_FragCoord, depth);`:""}
        ${e.hasColorTexture?R.H`
                vec4 texColor = texture(tex, ${e.hasColorTextureTransform?R.H`colorUV`:R.H`vuv0`});
                ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:R.H`vec4 texColor = vec4(1.0);`}
        ${e.hasVertexColors?R.H`float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:R.H`float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}

        fragColor = vec4(opacity_);
      }
    `)),e.output===o.V.Color&&(t.include(a.HQ,e),t.include(g.kA,e),t.include(v.n,e),t.include(O.S,e),t.include(e.instancedDoublePrecision?A.G:A.Bz,e),t.include(x.Q,e),(0,E.yu)(t.fragment,e),(0,_.Gc)(D),(0,g.a8)(D),(0,g.eU)(D),D.uniforms.add(r.uniforms.get("localOrigin"),r.uniforms.get("view"),new w.t("ambient",(e=>e.ambient)),new w.t("diffuse",(e=>e.diffuse)),new I.m("opacity",(e=>e.opacity)),new I.m("layerOpacity",(e=>e.layerOpacity))),e.hasColorTexture&&D.uniforms.add(new L.N("tex",(e=>e.texture))),t.include(b._Z,e),t.include(T.c,e),D.include(C.N),(0,_.O4)(D),D.code.add(R.H`
      void main() {
        discardBySlice(vpos);
        ${e.hasMultipassTerrain?R.H`terrainDepthTest(gl_FragCoord, depth);`:""}
        ${e.hasColorTexture?R.H`
                vec4 texColor = texture(tex, ${e.hasColorTextureTransform?R.H`colorUV`:R.H`vuv0`});
                ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:R.H`vec4 texColor = vec4(1.0);`}
        vec3 viewDirection = normalize(vpos - cameraPosition);
        ${e.pbrMode===b.A9.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${e.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":e.spherical?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${e.hasVertexColors?R.H`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:R.H`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${e.snowCover?R.H`albedo = mix(albedo, vec3(1), 0.9);`:R.H``}
        ${R.H`
            vec3 shadingNormal = normalize(vNormalWorld);
            albedo *= 1.2;
            vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
            float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
            float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
            float treeRadialFalloff = vColor.r;
            float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
            additionalLight += backLightFactor * mainLightIntensity;`}
        ${e.pbrMode===b.A9.Normal||e.pbrMode===b.A9.Schematic?e.spherical?R.H`vec3 normalGround = normalize(vpos + localOrigin);`:R.H`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:R.H``}
        ${e.pbrMode===b.A9.Normal||e.pbrMode===b.A9.Schematic?R.H`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${e.snowCover?R.H`
                        mrr = vec3(0.0, 1.0, 0.04);
                        emission = vec3(0.0);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:R.H`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        fragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.transparencyPassType===P.y.Color?R.H`fragColor = premultiplyAlpha(fragColor);`:R.H``}
      }
    `)),t.include(p.E,e),t}const F=Object.freeze(Object.defineProperty({__proto__:null,build:D},Symbol.toStringTag,{value:"Module"}))},88545:function(e,t,r){r.d(t,{S:function(){return g},b:function(){return m},g:function(){return p}});var n=r(28589),i=r(15329),o=r(48812),a=r(541),s=r(75049),l=r(13418),c=r(45804),u=r(80545),d=r(72325),h=r(47613);const f=16;function m(){const e=new d.N5,t=e.fragment;return e.include(o.c),t.include(a.D),e.include(s.I),t.uniforms.add(new c.m("radius",((e,t)=>p(t.camera)))),t.code.add(u.H`vec3 sphere[16];
void fillSphere() {
sphere[0] = vec3(0.186937, 0.0, 0.0);
sphere[1] = vec3(0.700542, 0.0, 0.0);
sphere[2] = vec3(-0.864858, -0.481795, -0.111713);
sphere[3] = vec3(-0.624773, 0.102853, -0.730153);
sphere[4] = vec3(-0.387172, 0.260319, 0.007229);
sphere[5] = vec3(-0.222367, -0.642631, -0.707697);
sphere[6] = vec3(-0.01336, -0.014956, 0.169662);
sphere[7] = vec3(0.122575, 0.1544, -0.456944);
sphere[8] = vec3(-0.177141, 0.85997, -0.42346);
sphere[9] = vec3(-0.131631, 0.814545, 0.524355);
sphere[10] = vec3(-0.779469, 0.007991, 0.624833);
sphere[11] = vec3(0.308092, 0.209288,0.35969);
sphere[12] = vec3(0.359331, -0.184533, -0.377458);
sphere[13] = vec3(0.192633, -0.482999, -0.065284);
sphere[14] = vec3(0.233538, 0.293706, -0.055139);
sphere[15] = vec3(0.417709, -0.386701, 0.442449);
}
float fallOffFunction(float vv, float vn, float bias) {
float f = max(radius * radius - vv, 0.0);
return f * f * f * max(vn - bias, 0.0);
}`),t.code.add(u.H`float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {
vec3 v = Q - C;
float vv = dot(v, v);
float vn = dot(normalize(v), n_C);
return fallOffFunction(vv, vn, 0.1);
}`),t.uniforms.add(new l.G("nearFar",((e,t)=>t.camera.nearFar)),new h.N("normalMap",(e=>e.normalTexture)),new h.N("depthMap",(e=>e.depthTexture)),new l.G("zScale",((e,t)=>(0,s.N)(t))),new c.m("projScale",(e=>e.projScale)),new h.N("rnm",(e=>e.noiseTexture)),new l.G("rnmScale",((e,t)=>(0,n.s)(v,t.camera.fullWidth/e.noiseTexture.descriptor.width,t.camera.fullHeight/e.noiseTexture.descriptor.height))),new c.m("intensity",(e=>e.intensity)),new l.G("screenSize",((e,t)=>(0,n.s)(v,t.camera.fullWidth,t.camera.fullHeight)))),t.code.add(u.H`
    void main(void) {
      fillSphere();
      vec3 fres = normalize(2.0 * texture(rnm, uv * rnmScale).xyz - 1.0);
      float currentPixelDepth = linearDepthFromTexture(depthMap, uv, nearFar);

      if (-currentPixelDepth>nearFar.y || -currentPixelDepth<nearFar.x) {
        fragColor = vec4(0);
        return;
      }

      vec3 currentPixelPos = reconstructPosition(gl_FragCoord.xy,currentPixelDepth);

      // get the normal of current fragment
      vec4 norm4 = texture(normalMap, uv);
      vec3 norm = vec3(-1.0) + 2.0 * norm4.xyz;
      bool isTerrain = norm4.w < 0.5;

      float sum = 0.0;
      vec3 tapPixelPos;

      // note: the factor 2.0 should not be necessary, but makes ssao much nicer.
      // bug or deviation from CE somewhere else?
      float ps = projScale / (2.0 * currentPixelPos.z * zScale.x + zScale.y);

      for(int i = 0; i < ${u.H.int(f)}; ++i) {
        vec2 unitOffset = reflect(sphere[i], fres).xy;
        vec2 offset = vec2(-unitOffset * radius * ps);

        //don't use current or very nearby samples
        if( abs(offset.x) < 2.0 || abs(offset.y) < 2.0){
          continue;
        }

        vec2 tc = vec2(gl_FragCoord.xy + offset);
        if (tc.x < 0.0 || tc.y < 0.0 || tc.x > screenSize.x || tc.y > screenSize.y) continue;
        vec2 tcTap = tc / screenSize;
        float occluderFragmentDepth = linearDepthFromTexture(depthMap, tcTap, nearFar);

        if (isTerrain) {
          if (texture(normalMap, tcTap).w < 0.5) {
            continue;
          }
        }

        tapPixelPos = reconstructPosition(tc, occluderFragmentDepth);

        sum+= aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);
      }

      // output the result
      float A = max(1.0 - sum * intensity / float(${u.H.int(f)}), 0.0);

      // Anti-tone map to reduce contrast and drag dark region farther: (x^0.2 + 1.2 * x^4) / 2.2
      A = (pow(A, 0.2) + 1.2 * A*A*A*A) / 2.2;
      fragColor = vec4(A);
    }
  `),e}function p(e){return Math.max(10,20*e.computeScreenPixelSizeAtDist(Math.abs(4*e.relativeElevation)))}const v=(0,i.a)(),g=Object.freeze(Object.defineProperty({__proto__:null,build:m,getRadius:p},Symbol.toStringTag,{value:"Module"}))},56930:function(e,t,r){r.d(t,{S:function(){return p},b:function(){return m}});var n=r(67886),i=r(48812),o=r(541),a=r(53543),s=r(13418),l=r(45804),c=r(80545),u=r(72325),d=r(47076),h=r(47613);const f=4;function m(){const e=new u.N5,t=e.fragment;e.include(i.c);const r=(f+1)/2,m=1/(2*r*r);return t.include(o.D),t.uniforms.add(new h.N("depthMap",(e=>e.depthTexture)),new d.o("tex",(e=>e.colorTexture)),new a.t("blurSize",(e=>e.blurSize)),new l.m("projScale",((e,t)=>{const r=(0,n.i)(t.camera.eye,t.camera.center);return r>5e4?Math.max(0,e.projScale-(r-5e4)):e.projScale})),new s.G("nearFar",((e,t)=>t.camera.nearFar))),t.code.add(c.H`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv, nearFar);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${c.H.float(m)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `),t.code.add(c.H`
    void main(void) {
      float b = 0.0;
      float w_total = 0.0;

      float center_d = linearDepthFromTexture(depthMap, uv, nearFar);

      float sharpness = -0.05 * projScale / center_d;
      for (int r = -${c.H.int(f)}; r <= ${c.H.int(f)}; ++r) {
        float rf = float(r);
        vec2 uvOffset = uv + rf * blurSize;
        blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
      }

      fragColor = vec4(b / w_total);
    }
  `),e}const p=Object.freeze(Object.defineProperty({__proto__:null,build:m},Symbol.toStringTag,{value:"Module"}))},9030:function(e,t,r){r.d(t,{a:function(){return s},b:function(){return a},c:function(){return i},d:function(){return u},e:function(){return l},n:function(){return d},s:function(){return c},t:function(){return o}});var n=r(28672);function i(e,t,r){o(e.typedBuffer,t.typedBuffer,r,e.typedBufferStride,t.typedBufferStride)}function o(e,t,r,i=3,o=i){if(e.length/i!==Math.ceil(t.length/o))return n.J.error("source and destination buffers need to have the same number of elements"),e;const a=e.length/i,s=r[0],l=r[1],c=r[2],u=r[4],d=r[5],h=r[6],f=r[8],m=r[9],p=r[10],v=r[12],g=r[13],_=r[14];let x=0,T=0;for(let n=0;n<a;n++){const r=t[x],n=t[x+1],a=t[x+2];e[T]=s*r+u*n+f*a+v,e[T+1]=l*r+d*n+m*a+g,e[T+2]=c*r+h*n+p*a+_,x+=o,T+=i}return e}function a(e,t,r){s(e.typedBuffer,t.typedBuffer,r,e.typedBufferStride,t.typedBufferStride)}function s(e,t,r,i=3,o=i){if(e.length/i!==Math.ceil(t.length/o))return void n.J.error("source and destination buffers need to have the same number of elements");const a=e.length/i,s=r[0],l=r[1],c=r[2],u=r[3],d=r[4],h=r[5],f=r[6],m=r[7],p=r[8];let v=0,g=0;for(let n=0;n<a;n++){const r=t[v],n=t[v+1],a=t[v+2];e[g]=s*r+u*n+f*a,e[g+1]=l*r+d*n+m*a,e[g+2]=c*r+h*n+p*a,v+=o,g+=i}}function l(e,t,r){c(e.typedBuffer,t,r,e.typedBufferStride)}function c(e,t,r,n=3){const i=Math.min(e.length/n,t.count),o=t.typedBuffer,a=t.typedBufferStride;let s=0,l=0;for(let c=0;c<i;c++)e[l]=r*o[s],e[l+1]=r*o[s+1],e[l+2]=r*o[s+2],s+=a,l+=n}function u(e,t){d(e.typedBuffer,t.typedBuffer,e.typedBufferStride,t.typedBufferStride)}function d(e,t,r=3,n=r){const i=Math.min(e.length/r,t.length/n);let o=0,a=0;for(let s=0;s<i;s++){const i=t[o],s=t[o+1],l=t[o+2],c=i*i+s*s+l*l;if(c>0){const t=1/Math.sqrt(c);e[a]=t*i,e[a+1]=t*s,e[a+2]=t*l}o+=n,a+=r}}function h(e,t,r){const n=Math.min(e.count,t.count),i=e.typedBuffer,o=e.typedBufferStride,a=t.typedBuffer,s=t.typedBufferStride;let l=0,c=0;for(let u=0;u<n;u++)i[c]=a[l]>>r,i[c+1]=a[l+1]>>r,i[c+2]=a[l+2]>>r,l+=s,c+=o}Object.freeze(Object.defineProperty({__proto__:null,normalize:d,normalizeView:u,scale:c,scaleView:l,shiftRight:h,transformMat3:s,transformMat3View:a,transformMat4:o,transformMat4View:i},Symbol.toStringTag,{value:"Module"}))},67779:function(e,t,r){r.d(t,{b:function(){return i},c:function(){return n},f:function(){return o}});r(16573),r(78100),r(77936),r(37467),r(44732),r(79577);function n(){return new Float32Array(3)}function i(e){const t=new Float32Array(3);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t}function o(e,t,r){const n=new Float32Array(3);return n[0]=e,n[1]=t,n[2]=r,n}function a(e,t){return new Float32Array(e,t,3)}function s(){return n()}function l(){return o(1,1,1)}function c(){return o(1,0,0)}function u(){return o(0,1,0)}function d(){return o(0,0,1)}const h=s(),f=l(),m=c(),p=u(),v=d();Object.freeze(Object.defineProperty({__proto__:null,ONES:f,UNIT_X:m,UNIT_Y:p,UNIT_Z:v,ZEROS:h,clone:i,create:n,createView:a,fromValues:o,ones:l,unitX:c,unitY:u,unitZ:d,zeros:s},Symbol.toStringTag,{value:"Module"}))},30687:function(e,t,r){r.d(t,{O:function(){return n}});class n{constructor(){this._outer=new Map}clear(){this._outer.clear()}get empty(){return 0===this._outer.size}get(e,t){return this._outer.get(e)?.get(t)}set(e,t,r){const n=this._outer.get(e);n?n.set(t,r):this._outer.set(e,new Map([[t,r]]))}delete(e,t){const r=this._outer.get(e);r&&(r.delete(t),0===r.size&&this._outer.delete(e))}forEach(e){this._outer.forEach(((t,r)=>e(t,r)))}}},94793:function(e,t,r){function n(e){return 32+e.length}function i(e){return 16}function o(e){if(!e)return 0;let t=u;for(const r in e)if(e.hasOwnProperty(r)){const o=e[r];switch(typeof o){case"string":t+=n(o);break;case"number":t+=i();break;case"boolean":t+=4}}return t}function a(e){if(!e)return 0;if(Array.isArray(e))return s(e);let t=u;for(const r in e)e.hasOwnProperty(r)&&(t+=l(e[r]));return t}function s(e){const t=e.length;if(0===t||"number"==typeof e[0])return 32+8*t;let r=d;for(let n=0;n<t;n++)r+=l(e[n]);return r}function l(e){switch(typeof e){case"object":return a(e);case"string":return n(e);case"number":return i();case"boolean":return 4;default:return 8}}function c(e,t){return d+e.length*t}r.d(t,{eY:function(){return o},iL:function(){return a},zd:function(){return c}});const u=32,d=32},30085:function(e,t,r){function n(e){return e=e||globalThis.location.hostname,c.some((t=>null!=e?.match(t)))}function i(e,t){return e&&(t=t||globalThis.location.hostname)?null!=t.match(o)||null!=t.match(s)?e.replace("static.arcgis.com","staticdev.geoscene.cn"):null!=t.match(a)||null!=t.match(l)?e.replace("static.arcgis.com","staticqa.arcgis.com"):e:e}r.d(t,{EM:function(){return i},b5:function(){return n}});const o=/^devext.geoscene.cn$/,a=/^qaext.geoscene.cn$/,s=/^[\w-]*\.mapsdevext.geoscene.cn$/,l=/^[\w-]*\.mapsqa.geoscene.cn$/,c=[/^([\w-]*\.)?[\w-]*\.zrh-dev-local.esri.com$/,o,a,/^jsapps.esri.com$/,s,l]},26110:function(e,t,r){r.d(t,{Dg:function(){return i},my:function(){return a},tM:function(){return u}});r(16573),r(78100),r(77936),r(37467),r(44732),r(79577);var n=r(48119);function i(e){return(0,n.cy)(e)?e.length<n.tt?e:o(e):e.length<n.tt?Array.from(e):e.BYTES_PER_ELEMENT===Uint16Array.BYTES_PER_ELEMENT?e:o(e)}function o(e){let t=!0;for(const r of e){if(r>=65536)return(0,n.cy)(e)?new Uint32Array(e):e;r>=256&&(t=!1)}return t?new Uint8Array(e):new Uint16Array(e)}function a(e){return e<=n.tt?new Array(e):e<=65536?new Uint16Array(e):new Uint32Array(e)}let s=(()=>{const e=new Uint32Array(131072);for(let t=0;t<e.length;++t)e[t]=t;return e})();const l=[0],c=(()=>{const e=new Uint16Array(65536);for(let t=0;t<e.length;++t)e[t]=t;return e})();function u(e){if(1===e)return l;if(e<n.tt)return Array.from(new Uint16Array(c.buffer,0,e));if(e<c.length)return new Uint16Array(c.buffer,0,e);if(e>s.length){const t=Math.max(2*s.length,e);s=new Uint32Array(t);for(let e=0;e<s.length;e++)s[e]=e}return new Uint32Array(s.buffer,0,e)}new Uint8Array(65536)},28672:function(e,t,r){r.d(t,{J:function(){return i}});var n=r(15114);const i=n.A.getLogger("geoscene.views.3d.support.buffer.math")},5520:function(e,t,r){r.d(t,{Cr:function(){return c},_I:function(){return u},vt:function(){return l}});var n=r(26011),i=r(51521),o=r(67886),a=r(456),s=r(56749);function l(e){return e?{origin:(0,a.a)(e.origin),vector:(0,a.a)(e.vector)}:{origin:(0,a.c)(),vector:(0,a.c)()}}function c(e,t,r=l()){return(0,o.c)(r.origin,e),(0,o.b)(r.vector,t,e),r}function u(e,t,r){return d(e,t,0,1,r)}function d(e,t,r,i,a){const{vector:l,origin:c}=e,u=(0,o.b)(s.rq.get(),t,c),d=(0,o.e)(l,u)/(0,o.p)(l);return(0,o.g)(a,l,(0,n.qE)(d,r,i)),(0,o.a)(a,a,e.origin)}(0,a.c)(),(0,a.c)(),new i.I((()=>l()))},7641:function(e,t,r){r.d(t,{D:function(){return i}});var n=r(86039);async function i(e,t){const{data:r}=await(0,n["default"])(e,{responseType:"image",...t});return r}},24822:function(e,t,r){r.d(t,{fetch:function(){return Gr}});r(44114),r(16573),r(78100),r(77936),r(37467),r(44732),r(79577);var n=r(30085),i=r(13030),o=r(37072),a=r(90183),s=r(26671),l=r(67886),c=r(456),u=r(32604),d=r(48119);function h(e,t=!1){return e<=d.tt?t?new Array(e).fill(0):new Array(e):new Float32Array(e)}var f=r(44050),m=r(9030),p=r(62553),v=r(27551),g=r(10949),_=r(66122),x=r(67739),T=r(58430),b=r(15286),A=r(15982),S=r(45611),y=r(78838);function O(e){if(null==e)return null;const t=null!=e.offset?e.offset:y.Z,r=null!=e.rotation?e.rotation:0,n=null!=e.scale?e.scale:y.O,o=(0,S.f)(1,0,0,0,1,0,t[0],t[1],1),a=(0,S.f)(Math.cos(r),-Math.sin(r),0,Math.sin(r),Math.cos(r),0,0,0,1),s=(0,S.f)(n[0],0,0,0,n[1],0,0,0,1),l=(0,S.c)();return(0,i.m)(l,a,s),(0,i.m)(l,o,l),l}class C{constructor(){this.geometries=new Array,this.materials=new Array,this.textures=new Array}}class E{constructor(e,t,r){this.name=e,this.lodThreshold=t,this.pivotOffset=r,this.stageResources=new C,this.numberOfVertices=0}}var w=r(86039),M=r(49067),I=r(94793),R=r(47966),N=r(15114),L=r(30687),P=r(71120),H=r(39752),D=r(7641),F=r(65246),V=r(78964),B=r(26110);function z(e){if(e.length<d.tt)return Array.from(e);if((0,d.cy)(e))return Float64Array.from(e);if(!("BYTES_PER_ELEMENT"in e))return Array.from(e);switch(e.BYTES_PER_ELEMENT){case 1:return Uint8Array.from(e);case 2:return(0,d.jq)(e)?Uint16Array.from(e):Int16Array.from(e);case 4:return Float32Array.from(e);default:return Float64Array.from(e)}}var U=r(42079),W=r(28544);class G{constructor(e,t,r,n){this.primitiveIndices=e,this._numIndexPerPrimitive=t,this.indices=r,this.position=n,this._children=void 0,(0,W.vA)(e.length>=1),(0,W.vA)(r.length%this._numIndexPerPrimitive==0),(0,W.vA)(r.length>=e.length*this._numIndexPerPrimitive),(0,W.vA)(3===n.size||4===n.size);const{data:i,size:o}=n,a=e.length;let s=o*r[this._numIndexPerPrimitive*e[0]];k.clear(),k.push(s);const u=(0,c.f)(i[s],i[s+1],i[s+2]),d=(0,c.a)(u);for(let l=0;l<a;++l){const t=this._numIndexPerPrimitive*e[l];for(let e=0;e<this._numIndexPerPrimitive;++e){s=o*r[t+e],k.push(s);let n=i[s];u[0]=Math.min(n,u[0]),d[0]=Math.max(n,d[0]),n=i[s+1],u[1]=Math.min(n,u[1]),d[1]=Math.max(n,d[1]),n=i[s+2],u[2]=Math.min(n,u[2]),d[2]=Math.max(n,d[2])}}this.bbMin=u,this.bbMax=d;const h=(0,l.h)((0,c.c)(),this.bbMin,this.bbMax,.5);this.radius=.5*Math.max(Math.max(d[0]-u[0],d[1]-u[1]),d[2]-u[2]);let f=this.radius*this.radius;for(let l=0;l<k.length;++l){s=k.at(l);const e=i[s]-h[0],t=i[s+1]-h[1],r=i[s+2]-h[2],n=e*e+t*t+r*r;if(n<=f)continue;const o=Math.sqrt(n),a=.5*(o-this.radius);this.radius=this.radius+a,f=this.radius*this.radius;const c=a/o;h[0]+=e*c,h[1]+=t*c,h[2]+=r*c}this.center=h,k.clear()}getChildren(){if(this._children||(0,l.d)(this.bbMin,this.bbMax)<=1)return this._children;const e=(0,l.h)((0,c.c)(),this.bbMin,this.bbMax,.5),t=this.primitiveIndices.length,r=new Uint8Array(t),n=new Array(8);for(let l=0;l<8;++l)n[l]=0;const{data:i,size:o}=this.position;for(let l=0;l<t;++l){let t=0;const a=this._numIndexPerPrimitive*this.primitiveIndices[l];let s=o*this.indices[a],c=i[s],u=i[s+1],d=i[s+2];for(let e=1;e<this._numIndexPerPrimitive;++e){s=o*this.indices[a+e];const t=i[s],r=i[s+1],n=i[s+2];t<c&&(c=t),r<u&&(u=r),n<d&&(d=n)}c<e[0]&&(t|=1),u<e[1]&&(t|=2),d<e[2]&&(t|=4),r[l]=t,++n[t]}let a=0;for(let l=0;l<8;++l)n[l]>0&&++a;if(a<2)return;const s=new Array(8);for(let l=0;l<8;++l)s[l]=n[l]>0?new Uint32Array(n[l]):void 0;for(let l=0;l<8;++l)n[l]=0;for(let l=0;l<t;++l){const e=r[l];s[e][n[e]++]=this.primitiveIndices[l]}this._children=new Array;for(let l=0;l<8;++l)void 0!==s[l]&&this._children.push(new G(s[l],this._numIndexPerPrimitive,this.indices,this.position));return this._children}static prune(){k.prune()}}const k=new U.A({deallocator:null});var $=r(60548),j=r(99484),q=r(51521),X=r(5520);r(56749);function Y(e){return e?{p0:(0,c.a)(e.p0),p1:(0,c.a)(e.p1),p2:(0,c.a)(e.p2)}:{p0:(0,c.c)(),p1:(0,c.c)(),p2:(0,c.c)()}}function Z(e,t,r){return(0,l.b)(Q,t,e),(0,l.b)(K,r,e),(0,l.l)((0,l.f)(Q,Q,K))/2}new q.I(X.vt),new q.I((()=>Y()));const Q=(0,c.c)(),K=(0,c.c)();function J(e,t,r){if(!e||!t)return!1;const{size:n,data:i}=e;(0,l.s)(r,0,0,0),(0,l.s)(oe,0,0,0);let o=0,a=0;for(let s=0;s<t.length-2;s+=3){const e=t[s]*n,c=t[s+1]*n,u=t[s+2]*n;(0,l.s)(re,i[e],i[e+1],i[e+2]),(0,l.s)(ne,i[c],i[c+1],i[c+2]),(0,l.s)(ie,i[u],i[u+1],i[u+2]);const d=Z(re,ne,ie);d?((0,l.a)(re,re,ne),(0,l.a)(re,re,ie),(0,l.g)(re,re,1/3*d),(0,l.a)(r,r,re),o+=d):((0,l.a)(oe,oe,re),(0,l.a)(oe,oe,ne),(0,l.a)(oe,oe,ie),a+=3)}return(0!==a||0!==o)&&(0!==o?((0,l.g)(r,r,1/o),!0):0!==a&&((0,l.g)(r,oe,1/a),!0))}function ee(e,t,r){if(!e||!t)return!1;const{size:n,data:i}=e;(0,l.s)(r,0,0,0);let o=-1,a=0;for(let s=0;s<t.length;s++){const e=t[s]*n;o!==e&&(r[0]+=i[e],r[1]+=i[e+1],r[2]+=i[e+2],a++),o=e}return a>1&&(0,l.g)(r,r,1/a),a>0}function te(e,t,r,n){if(!e)return!1;(0,l.s)(n,0,0,0),(0,l.s)(oe,0,0,0);let i=0,o=0;const{size:a,data:s}=e,c=t?t.length-1:s.length/a-1,u=c+(r?2:0);for(let d=0;d<u;d+=2){const e=d<c?d:c,r=d<c?d+1:0,u=(t?t[e]:e)*a,h=(t?t[r]:r)*a;re[0]=s[u],re[1]=s[u+1],re[2]=s[u+2],ne[0]=s[h],ne[1]=s[h+1],ne[2]=s[h+2],(0,l.g)(re,(0,l.a)(re,re,ne),.5);const f=(0,l.j)(re,ne);f>0?((0,l.a)(n,n,(0,l.g)(re,re,f)),i+=f):0===i&&((0,l.a)(oe,oe,re),o++)}return 0!==i?((0,l.g)(n,n,1/i),!0):0!==o&&((0,l.g)(n,oe,1/o),!0)}const re=(0,c.c)(),ne=(0,c.c)(),ie=(0,c.c)(),oe=(0,c.c)();var ae=r(62242);class se{constructor(e){this.channel=e,this.id=(0,ae.L)()}}var le=r(6360);r(10645);function ce(e,t){return null==e&&(e=[]),e.push(t),e}function ue(e,t){if(null==e)return null;const r=e.filter((e=>e!==t));return 0===r.length?null:r}(0,c.c)(),new Float32Array(6);class de extends $.J{constructor(e,t,r=[],n=null,i=j.X.Mesh,o=null,a=-1){super(),this.material=e,this.mapPositions=n,this.type=i,this.objectAndLayerIdColor=o,this.edgeIndicesLength=a,this.visible=!0,this._vertexAttributes=new Map,this._indices=new Map,this._boundingInfo=null;for(const[s,l]of t)l&&this._vertexAttributes.set(s,{...l});if(null==r||0===r.length){const e=he(this._vertexAttributes),t=(0,B.tM)(e);this.edgeIndicesLength=this.edgeIndicesLength<0?e:this.edgeIndicesLength;for(const r of this._vertexAttributes.keys())this._indices.set(r,t)}else for(const[s,l]of r)l&&(this._indices.set(s,(0,B.Dg)(l)),s===le.r.POSITION&&(this.edgeIndicesLength=this.edgeIndicesLength<0?this._indices.get(s).length:this.edgeIndicesLength))}instantiate(e={}){const t=new de(e.material||this.material,[],void 0,this.mapPositions,this.type,this.objectAndLayerIdColor,this.edgeIndicesLength);return this._vertexAttributes.forEach(((e,r)=>{e.exclusive=!1,t._vertexAttributes.set(r,e)})),this._indices.forEach(((e,r)=>t._indices.set(r,e))),t._boundingInfo=this._boundingInfo,t.transformation=e.transformation||this.transformation,t}get vertexAttributes(){return this._vertexAttributes}getMutableAttribute(e){let t=this._vertexAttributes.get(e);return t&&!t.exclusive&&(t={...t,exclusive:!0,data:z(t.data)},this._vertexAttributes.set(e,t)),t}setAttributeData(e,t){const r=this._vertexAttributes.get(e);r&&this._vertexAttributes.set(e,{...r,exclusive:!0,data:t})}get indices(){return this._indices}get indexCount(){const e=this._indices.values().next().value;return e?e.length:0}get faceCount(){return this.indexCount/3}get boundingInfo(){return null==this._boundingInfo&&(this._boundingInfo=this._calculateBoundingInfo()),this._boundingInfo}computeAttachmentOrigin(e){return!!(this.type===j.X.Mesh?this._computeAttachmentOriginTriangles(e):this.type===j.X.Line?this._computeAttachmentOriginLines(e):this._computeAttachmentOriginPoints(e))&&(null!=this._transformation&&(0,l.m)(e,e,this._transformation),!0)}_computeAttachmentOriginTriangles(e){const t=this.indices.get(le.r.POSITION),r=this.vertexAttributes.get(le.r.POSITION);return J(r,t,e)}_computeAttachmentOriginLines(e){const t=this.vertexAttributes.get(le.r.POSITION),r=this.indices.get(le.r.POSITION);return te(t,r,r&&fe(this.material.parameters,t,r),e)}_computeAttachmentOriginPoints(e){const t=this.indices.get(le.r.POSITION),r=this.vertexAttributes.get(le.r.POSITION);return ee(r,t,e)}invalidateBoundingInfo(){this._boundingInfo=null}_calculateBoundingInfo(){const e=this.indices.get(le.r.POSITION),t=this.vertexAttributes.get(le.r.POSITION);if(!e||0===e.length||!t)return null;const r=this.type===j.X.Mesh?3:1;(0,W.vA)(e.length%r==0,"Indexing error: "+e.length+" not divisible by "+r);const n=(0,B.tM)(e.length/r);return new G(n,r,e,t)}get transformation(){return this._transformation??s.I}set transformation(e){this._transformation=e&&e!==s.I?(0,s.b)(e):null}get shaderTransformation(){return null!=this._shaderTransformer?this._shaderTransformer(this.transformation):this.transformation}get shaderTransformer(){return this._shaderTransformer}set shaderTransformer(e){this._shaderTransformer=e}get hasVolatileTransformation(){return null!=this._shaderTransformer}addHighlight(){const e=new se(V.Mg.Highlight);return this.highlights=ce(this.highlights,e),e}removeHighlight(e){this.highlights=ue(this.highlights,e)}}function he(e){const t=e.values().next().value;return null==t?0:t.data.length/t.size}function fe(e,t,r){return!(!("isClosed"in e)||!e.isClosed)&&(r?r.length>2:t.data.length>6)}var me=r(51020),pe=r(20573),ve=r(79908),ge=r(4244),_e=r(46166),xe=r(8281);function Te(){if(null==be){const e=e=>(0,xe.s)(`geoscene/libs/basisu/${e}`);be=r.e(6253).then(r.bind(r,26253)).then((e=>e.b)).then((({default:t})=>t({locateFile:e}).then((e=>(e.initializeBasis(),delete e.then,e)))))}return be}let be;var Ae;!function(e){e[e.ETC1_RGB=0]="ETC1_RGB",e[e.ETC2_RGBA=1]="ETC2_RGBA",e[e.BC1_RGB=2]="BC1_RGB",e[e.BC3_RGBA=3]="BC3_RGBA",e[e.BC4_R=4]="BC4_R",e[e.BC5_RG=5]="BC5_RG",e[e.BC7_M6_RGB=6]="BC7_M6_RGB",e[e.BC7_M5_RGBA=7]="BC7_M5_RGBA",e[e.PVRTC1_4_RGB=8]="PVRTC1_4_RGB",e[e.PVRTC1_4_RGBA=9]="PVRTC1_4_RGBA",e[e.ASTC_4x4_RGBA=10]="ASTC_4x4_RGBA",e[e.ATC_RGB=11]="ATC_RGB",e[e.ATC_RGBA=12]="ATC_RGBA",e[e.FXT1_RGB=17]="FXT1_RGB",e[e.PVRTC2_4_RGB=18]="PVRTC2_4_RGB",e[e.PVRTC2_4_RGBA=19]="PVRTC2_4_RGBA",e[e.ETC2_EAC_R11=20]="ETC2_EAC_R11",e[e.ETC2_EAC_RG11=21]="ETC2_EAC_RG11",e[e.RGBA32=13]="RGBA32",e[e.RGB565=14]="RGB565",e[e.BGR565=15]="BGR565",e[e.RGBA4444=16]="RGBA4444"}(Ae||(Ae={}));var Se=r(73719),ye=r(69635),Oe=r(1257);let Ce=null,Ee=null;async function we(){return null==Ee&&(Ee=Te(),Ce=await Ee),Ee}function Me(e,t){if(null==Ce)return e.byteLength;const r=new Ce.BasisFile(new Uint8Array(e)),n=Ne(r)?Re(r.getNumLevels(0),r.getHasAlpha(),r.getImageWidth(0,0),r.getImageHeight(0,0),t):0;return r.close(),r.delete(),n}function Ie(e,t){if(null==Ce)return e.byteLength;const r=new Ce.KTX2File(new Uint8Array(e)),n=Le(r)?Re(r.getLevels(),r.getHasAlpha(),r.getWidth(),r.getHeight(),t):0;return r.close(),r.delete(),n}function Re(e,t,r,n,i){const o=(0,Oe.IB)(t?Se.CQ.COMPRESSED_RGBA8_ETC2_EAC:Se.CQ.COMPRESSED_RGB8_ETC2),a=i&&e>1?(4**e-1)/(3*4**(e-1)):1;return Math.ceil(r*n*o*a)}function Ne(e){return e.getNumImages()>=1&&!e.isUASTC()}function Le(e){return e.getFaces()>=1&&e.isETC1S()}async function Pe(e,t,r){null==Ce&&(Ce=await we());const n=new Ce.BasisFile(new Uint8Array(r));if(!Ne(n))return null;n.startTranscoding();const i=De(e,t,n.getNumLevels(0),n.getHasAlpha(),n.getImageWidth(0,0),n.getImageHeight(0,0),((e,t)=>n.getImageTranscodedSizeInBytes(0,e,t)),((e,t,r)=>n.transcodeImage(r,0,e,t,0,0)));return n.close(),n.delete(),i}async function He(e,t,r){null==Ce&&(Ce=await we());const n=new Ce.KTX2File(new Uint8Array(r));if(!Le(n))return null;n.startTranscoding();const i=De(e,t,n.getLevels(),n.getHasAlpha(),n.getWidth(),n.getHeight(),((e,t)=>n.getImageTranscodedSizeInBytes(e,0,0,t)),((e,t,r)=>n.transcodeImage(r,e,0,0,t,0,-1,-1)));return n.close(),n.delete(),i}function De(e,t,r,n,i,o,a,s){const{compressedTextureETC:l,compressedTextureS3TC:c}=e.capabilities,[u,d]=l?n?[Ae.ETC2_RGBA,Se.CQ.COMPRESSED_RGBA8_ETC2_EAC]:[Ae.ETC1_RGB,Se.CQ.COMPRESSED_RGB8_ETC2]:c?n?[Ae.BC3_RGBA,Se.CQ.COMPRESSED_RGBA_S3TC_DXT5_EXT]:[Ae.BC1_RGB,Se.CQ.COMPRESSED_RGB_S3TC_DXT1_EXT]:[Ae.RGBA32,Se.Ab.RGBA],h=t.hasMipmap?r:Math.min(1,r),f=[];for(let m=0;m<h;m++)f.push(new Uint8Array(a(m,u))),s(m,u,f[m]);return t.internalFormat=d,t.hasMipmap=f.length>1,t.samplingMode=t.hasMipmap?Se.Cj.LINEAR_MIPMAP_LINEAR:Se.Cj.LINEAR,t.width=i,t.height=o,new ye.g(e,t,{type:"compressed",levels:f})}const Fe=N.A.getLogger("geoscene.views.3d.webgl-engine.lib.DDSUtil"),Ve=542327876,Be=131072,ze=4;function Ue(e){return e.charCodeAt(0)+(e.charCodeAt(1)<<8)+(e.charCodeAt(2)<<16)+(e.charCodeAt(3)<<24)}function We(e){return String.fromCharCode(255&e,e>>8&255,e>>16&255,e>>24&255)}const Ge=Ue("DXT1"),ke=Ue("DXT3"),$e=Ue("DXT5"),je=31,qe=0,Xe=1,Ye=2,Ze=3,Qe=4,Ke=7,Je=20,et=21;function tt(e,t,r){const n=rt(r,t.hasMipmap??!1);if(null==n)throw new Error("DDS texture data is null");const{textureData:i,internalFormat:o,width:a,height:s}=n;return t.samplingMode=i.levels.length>1?Se.Cj.LINEAR_MIPMAP_LINEAR:Se.Cj.LINEAR,t.hasMipmap=i.levels.length>1,t.internalFormat=o,t.width=a,t.height=s,new ye.g(e,t,i)}function rt(e,t){const r=new Int32Array(e,0,je);if(r[qe]!==Ve)return Fe.error("Invalid magic number in DDS header"),null;if(!(r[Je]&ze))return Fe.error("Unsupported format, must contain a FourCC code"),null;const n=r[et];let i,o;switch(n){case Ge:i=8,o=Se.CQ.COMPRESSED_RGB_S3TC_DXT1_EXT;break;case ke:i=16,o=Se.CQ.COMPRESSED_RGBA_S3TC_DXT3_EXT;break;case $e:i=16,o=Se.CQ.COMPRESSED_RGBA_S3TC_DXT5_EXT;break;default:return Fe.error("Unsupported FourCC code:",We(n)),null}let a=1,s=r[Qe],l=r[Ze];0==(3&s)&&0==(3&l)||(Fe.warn("Rounding up compressed texture size to nearest multiple of 4."),s=s+3&-4,l=l+3&-4);const c=s,u=l;let d,h;r[Ye]&Be&&!1!==t&&(a=Math.max(1,r[Ke]));let f=r[Xe]+4;const m=[];for(let p=0;p<a;++p)h=(s+3>>2)*(l+3>>2)*i,d=new Uint8Array(e,f,h),m.push(d),f+=h,s=Math.max(1,s>>1),l=Math.max(1,l>>1);return{textureData:{type:"compressed",levels:m},internalFormat:o,width:c,height:u}}var nt,it=r(54703);class ot extends $.J{constructor(e,t){super(),this._data=e,this.type=j.X.Texture,this._glTexture=null,this._loadingPromise=null,this._loadingController=null,this.events=new pe.A,this.parameters=t||{},this.parameters.mipmap=!1!==this.parameters.mipmap,this.parameters.noUnpackFlip=this.parameters.noUnpackFlip||!1,this.parameters.preMultiplyAlpha=this.parameters.preMultiplyAlpha||!1,this.parameters.wrap=this.parameters.wrap||{s:Se.pF.REPEAT,t:Se.pF.REPEAT},this._startPreload(e)}_startPreload(e){null!=e&&(e instanceof HTMLVideoElement?this._startPreloadVideoElement(e):e instanceof HTMLImageElement&&this._startPreloadImageElement(e))}_startPreloadVideoElement(e){if(!((0,ge.w8)(e.src)||"auto"===e.preload&&e.crossOrigin)){e.preload="auto",e.crossOrigin="anonymous";const t=!e.paused;if(e.src=e.src,t&&e.autoplay){const t=()=>{e.removeEventListener("canplay",t),e.play()};e.addEventListener("canplay",t)}}}_startPreloadImageElement(e){(0,ge.DB)(e.src)||(0,ge.w8)(e.src)||e.crossOrigin||(e.crossOrigin="anonymous",e.src=e.src)}dispose(){this._data=void 0}_createDescriptor(e){const t=new it.R;return t.wrapMode=this.parameters.wrap??Se.pF.REPEAT,t.flipped=!this.parameters.noUnpackFlip,t.samplingMode=this.parameters.mipmap?Se.Cj.LINEAR_MIPMAP_LINEAR:Se.Cj.LINEAR,t.hasMipmap=!!this.parameters.mipmap,t.preMultiplyAlpha=!!this.parameters.preMultiplyAlpha,t.maxAnisotropy=this.parameters.maxAnisotropy??(this.parameters.mipmap?e.parameters.maxMaxAnisotropy:1),t}get glTexture(){return this._glTexture}get memoryEstimate(){return this._glTexture?.gpuMemoryUsage||at(this._data,this.parameters)}load(e){if(null!=this._glTexture)return this._glTexture;if(this._loadingPromise)return this._loadingPromise;const t=this._data;return null==t?(this._glTexture=new ye.g(e,this._createDescriptor(e),null),this._glTexture):"string"==typeof t?this._loadFromURL(e,t):t instanceof Image?this._loadFromImageElement(e,t):t instanceof HTMLVideoElement?this._loadFromVideoElement(e,t):t instanceof ImageData||t instanceof HTMLCanvasElement?this._loadFromImage(e,t):((0,d.mw)(t)||(0,d.mg)(t))&&this.parameters.encoding===V.JS.DDS_ENCODING?(this._data=void 0,this._loadFromDDSData(e,t)):((0,d.mw)(t)||(0,d.mg)(t))&&this.parameters.encoding===V.JS.KTX2_ENCODING?(this._data=void 0,this._loadFromKTX2(e,t)):((0,d.mw)(t)||(0,d.mg)(t))&&this.parameters.encoding===V.JS.BASIS_ENCODING?(this._data=void 0,this._loadFromBasis(e,t)):(0,d.mg)(t)?this._loadFromPixelData(e,t):(0,d.mw)(t)?this._loadFromPixelData(e,new Uint8Array(t)):null}get requiresFrameUpdates(){return this._data instanceof HTMLVideoElement}frameUpdate(e){return this._data instanceof HTMLVideoElement&&null!=this._glTexture?this._data.readyState<nt.HAVE_CURRENT_DATA||e===this._data.currentTime?e:(this._glTexture.setData(this._data),this._glTexture.descriptor.hasMipmap&&this._glTexture.generateMipmap(),this.parameters.updateCallback&&this.parameters.updateCallback(),this._data.currentTime):e}_loadFromDDSData(e,t){return this._glTexture=tt(e,this._createDescriptor(e),t),this._glTexture}_loadFromKTX2(e,t){return this._loadAsync((()=>He(e,this._createDescriptor(e),t).then((e=>(this._glTexture=e,e)))))}_loadFromBasis(e,t){return this._loadAsync((()=>Pe(e,this._createDescriptor(e),t).then((e=>(this._glTexture=e,e)))))}_loadFromPixelData(e,t){(0,W.vA)(this.parameters.width>0&&this.parameters.height>0);const r=this._createDescriptor(e);return r.pixelFormat=1===this.parameters.components?Se.Ab.LUMINANCE:3===this.parameters.components?Se.Ab.RGB:Se.Ab.RGBA,r.width=this.parameters.width??0,r.height=this.parameters.height??0,this._glTexture=new ye.g(e,r,t),this._glTexture}_loadFromURL(e,t){return this._loadAsync((async r=>{const n=await(0,D.D)(t,{signal:r});return(0,P.Te)(r),this._loadFromImage(e,n)}))}_loadFromImageElement(e,t){return t.complete?this._loadFromImage(e,t):this._loadAsync((async r=>{const n=await(0,_e.Sx)(t,t.src,!1,r);return(0,P.Te)(r),this._loadFromImage(e,n)}))}_loadFromVideoElement(e,t){return t.readyState>=nt.HAVE_CURRENT_DATA?this._loadFromImage(e,t):this._loadFromVideoElementAsync(e,t)}_loadFromVideoElementAsync(e,t){return this._loadAsync((r=>new Promise(((n,i)=>{const o=()=>{t.removeEventListener("loadeddata",a),t.removeEventListener("error",s),(0,ve.xt)(l)},a=()=>{t.readyState>=nt.HAVE_CURRENT_DATA&&(o(),n(this._loadFromImage(e,t)))},s=e=>{o(),i(e||new R.A("Failed to load video"))};t.addEventListener("loadeddata",a),t.addEventListener("error",s);const l=(0,P.u7)(r,(()=>s((0,P.NK)())))}))))}_loadFromImage(e,t){const r=st(t);this.parameters.width=r.width,this.parameters.height=r.height;const n=this._createDescriptor(e);return n.pixelFormat=3===this.parameters.components?Se.Ab.RGB:Se.Ab.RGBA,n.width=r.width,n.height=r.height,this._glTexture=new ye.g(e,n,t),this._glTexture}_loadAsync(e){const t=new AbortController;this._loadingController=t;const r=e(t.signal);this._loadingPromise=r;const n=()=>{this._loadingController===t&&(this._loadingController=null),this._loadingPromise===r&&(this._loadingPromise=null)};return r.then(n,n),r}unload(){if(this._glTexture=(0,ve.WD)(this._glTexture),null!=this._loadingController){const e=this._loadingController;this._loadingController=null,this._loadingPromise=null,e.abort()}this.events.emit("unloaded")}}function at(e,t){if(null==e)return 0;if((0,d.mw)(e)||(0,d.mg)(e))return t.encoding===V.JS.KTX2_ENCODING?Ie(e,!!t.mipmap):t.encoding===V.JS.BASIS_ENCODING?Me(e,!!t.mipmap):e.byteLength;const{width:r,height:n}=e instanceof Image||e instanceof ImageData||e instanceof HTMLCanvasElement||e instanceof HTMLVideoElement?st(e):t;return(t.mipmap?4/3:1)*r*n*(t.components||4)||0}function st(e){return e instanceof HTMLVideoElement?{width:e.videoWidth,height:e.videoHeight}:e}!function(e){e[e.HAVE_NOTHING=0]="HAVE_NOTHING",e[e.HAVE_METADATA=1]="HAVE_METADATA",e[e.HAVE_CURRENT_DATA=2]="HAVE_CURRENT_DATA",e[e.HAVE_FUTURE_DATA=3]="HAVE_FUTURE_DATA",e[e.HAVE_ENOUGH_DATA=4]="HAVE_ENOUGH_DATA"}(nt||(nt={}));var lt,ct=r(79515),ut=r(89223),dt=r(40443),ht=r(96524),ft=r(95190),mt=r(6065),pt=r(12591),vt=r(18883),gt=r(29632);!function(e){e[e.INTEGRATED_MESH=0]="INTEGRATED_MESH",e[e.OPAQUE_TERRAIN=1]="OPAQUE_TERRAIN",e[e.OPAQUE_MATERIAL=2]="OPAQUE_MATERIAL",e[e.TRANSPARENT_MATERIAL=3]="TRANSPARENT_MATERIAL",e[e.TRANSPARENT_TERRAIN=4]="TRANSPARENT_TERRAIN",e[e.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL=5]="TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL",e[e.OCCLUDED_TERRAIN=6]="OCCLUDED_TERRAIN",e[e.OCCLUDER_MATERIAL=7]="OCCLUDER_MATERIAL",e[e.TRANSPARENT_OCCLUDER_MATERIAL=8]="TRANSPARENT_OCCLUDER_MATERIAL",e[e.OCCLUSION_PIXELS=9]="OCCLUSION_PIXELS",e[e.POSTPROCESSING_ENVIRONMENT_OPAQUE=10]="POSTPROCESSING_ENVIRONMENT_OPAQUE",e[e.POSTPROCESSING_ENVIRONMENT_TRANSPARENT=11]="POSTPROCESSING_ENVIRONMENT_TRANSPARENT",e[e.LASERLINES=12]="LASERLINES",e[e.LASERLINES_CONTRAST_CONTROL=13]="LASERLINES_CONTRAST_CONTROL",e[e.HUD_MATERIAL=14]="HUD_MATERIAL",e[e.LABEL_MATERIAL=15]="LABEL_MATERIAL",e[e.LINE_CALLOUTS=16]="LINE_CALLOUTS",e[e.LINE_CALLOUTS_HUD_DEPTH=17]="LINE_CALLOUTS_HUD_DEPTH",e[e.DRAPED_MATERIAL=18]="DRAPED_MATERIAL",e[e.DRAPED_WATER=19]="DRAPED_WATER",e[e.VOXEL=20]="VOXEL",e[e.MAX_SLOTS=21]="MAX_SLOTS"}(lt||(lt={}));var _t=r(34350),xt=r(71784),Tt=r(67779),bt=r(57488);class At{constructor(e=0){this.offset=e,this.tmpVertex=(0,c.c)()}applyToVertex(e,t,r){const n=e+this.localOrigin[0],i=t+this.localOrigin[1],o=r+this.localOrigin[2],a=this.offset/Math.sqrt(n*n+i*i+o*o);return this.tmpVertex[0]=e+n*a,this.tmpVertex[1]=t+i*a,this.tmpVertex[2]=r+o*a,this.tmpVertex}applyToAabb(e){for(let i=0;i<3;++i)St[i]=e[0+i]+this.localOrigin[i],yt[i]=e[3+i]+this.localOrigin[i],Ot[i]=St[i];const t=this.applyToVertex(St[0],St[1],St[2]);for(let i=0;i<3;++i)e[i]=t[i],e[i+3]=t[i];const r=t=>{const r=this.applyToVertex(t[0],t[1],t[2]);for(let n=0;n<3;++n)e[n]=Math.min(e[n],r[n]),e[n+3]=Math.max(e[n+3],r[n])};for(let i=1;i<8;++i){for(let e=0;e<3;++e)Ot[e]=0==(i&1<<e)?St[e]:yt[e];r(Ot)}let n=0;for(let i=0;i<3;++i)St[i]*yt[i]<0&&(n|=1<<i);if(0!==n&&7!==n)for(let i=0;i<8;++i)if(0==(n&i)){for(let e=0;e<3;++e)Ot[e]=0!=(n&1<<e)?0:0!=(i&1<<e)?St[e]:yt[e];r(Ot)}for(let i=0;i<3;++i)e[i]-=this.localOrigin[i],e[i+3]-=this.localOrigin[i];return e}}const St=(0,c.c)(),yt=(0,c.c)(),Ot=(0,c.c)();class Ct{constructor(e=0){this.componentLocalOriginLength=0,this._tmpVertex=(0,c.c)(),this._mbs=(0,bt.c)(),this._obb={center:(0,c.c)(),halfSize:(0,Tt.c)(),quaternion:null},this._totalOffset=0,this._offset=0,this._resetOffset(e)}_resetOffset(e){this._offset=e,this._totalOffset=e}set offset(e){this._resetOffset(e)}get offset(){return this._offset}set componentOffset(e){this._totalOffset=this._offset+e}set localOrigin(e){this.componentLocalOriginLength=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2])}applyToVertex(e,t,r){const n=e,i=t,o=r+this.componentLocalOriginLength,a=this._totalOffset/Math.sqrt(n*n+i*i+o*o);return this._tmpVertex[0]=e+n*a,this._tmpVertex[1]=t+i*a,this._tmpVertex[2]=r+o*a,this._tmpVertex}applyToAabb(e){const t=e[0],r=e[1],n=e[2]+this.componentLocalOriginLength,i=e[3],o=e[4],a=e[5]+this.componentLocalOriginLength,s=t*i<0?0:Math.min(Math.abs(t),Math.abs(i)),l=r*o<0?0:Math.min(Math.abs(r),Math.abs(o)),c=n*a<0?0:Math.min(Math.abs(n),Math.abs(a)),u=Math.sqrt(s*s+l*l+c*c);if(u<this._totalOffset)return e[0]-=t<0?this._totalOffset:0,e[1]-=r<0?this._totalOffset:0,e[2]-=n<0?this._totalOffset:0,e[3]+=i>0?this._totalOffset:0,e[4]+=o>0?this._totalOffset:0,e[5]+=a>0?this._totalOffset:0,e;const d=Math.max(Math.abs(t),Math.abs(i)),h=Math.max(Math.abs(r),Math.abs(o)),f=Math.max(Math.abs(n),Math.abs(a)),m=Math.sqrt(d*d+h*h+f*f),p=this._totalOffset/m,v=this._totalOffset/u;return e[0]+=t*(t>0?p:v),e[1]+=r*(r>0?p:v),e[2]+=n*(n>0?p:v),e[3]+=i*(i<0?p:v),e[4]+=o*(o<0?p:v),e[5]+=a*(a<0?p:v),e}applyToMbs(e){const t=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]),r=this._totalOffset/t;return this._mbs[0]=e[0]+e[0]*r,this._mbs[1]=e[1]+e[1]*r,this._mbs[2]=e[2]+e[2]*r,this._mbs[3]=e[3]+e[3]*this._totalOffset/t,this._mbs}applyToObb(e){const t=e.center,r=this._totalOffset/Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);this._obb.center[0]=t[0]+t[0]*r,this._obb.center[1]=t[1]+t[1]*r,this._obb.center[2]=t[2]+t[2]*r,(0,l.q)(this._obb.halfSize,e.halfSize,e.quaternion),(0,l.a)(this._obb.halfSize,this._obb.halfSize,e.center);const n=this._totalOffset/Math.sqrt(this._obb.halfSize[0]*this._obb.halfSize[0]+this._obb.halfSize[1]*this._obb.halfSize[1]+this._obb.halfSize[2]*this._obb.halfSize[2]);return this._obb.halfSize[0]+=this._obb.halfSize[0]*n,this._obb.halfSize[1]+=this._obb.halfSize[1]*n,this._obb.halfSize[2]+=this._obb.halfSize[2]*n,(0,l.b)(this._obb.halfSize,this._obb.halfSize,e.center),(0,_t.c)(It,e.quaternion),(0,l.q)(this._obb.halfSize,this._obb.halfSize,It),this._obb.halfSize[0]*=this._obb.halfSize[0]<0?-1:1,this._obb.halfSize[1]*=this._obb.halfSize[1]<0?-1:1,this._obb.halfSize[2]*=this._obb.halfSize[2]<0?-1:1,this._obb.quaternion=e.quaternion,this._obb}}class Et{constructor(e=0){this.offset=e,this.sphere=(0,bt.c)(),this.tmpVertex=(0,c.c)()}applyToVertex(e,t,r){const n=this.objectTransform.transform;let i=n[0]*e+n[4]*t+n[8]*r+n[12],o=n[1]*e+n[5]*t+n[9]*r+n[13],a=n[2]*e+n[6]*t+n[10]*r+n[14];const s=this.offset/Math.sqrt(i*i+o*o+a*a);i+=i*s,o+=o*s,a+=a*s;const l=this.objectTransform.inverse;return this.tmpVertex[0]=l[0]*i+l[4]*o+l[8]*a+l[12],this.tmpVertex[1]=l[1]*i+l[5]*o+l[9]*a+l[13],this.tmpVertex[2]=l[2]*i+l[6]*o+l[10]*a+l[14],this.tmpVertex}applyToMinMax(e,t){const r=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*r,e[1]+=e[1]*r,e[2]+=e[2]*r;const n=this.offset/Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]+=t[0]*n,t[1]+=t[1]*n,t[2]+=t[2]*n}applyToAabb(e){const t=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*t,e[1]+=e[1]*t,e[2]+=e[2]*t;const r=this.offset/Math.sqrt(e[3]*e[3]+e[4]*e[4]+e[5]*e[5]);return e[3]+=e[3]*r,e[4]+=e[4]*r,e[5]+=e[5]*r,e}applyToBoundingSphere(e){const t=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]),r=this.offset/t;return this.sphere[0]=e[0]+e[0]*r,this.sphere[1]=e[1]+e[1]*r,this.sphere[2]=e[2]+e[2]*r,this.sphere[3]=e[3]+e[3]*this.offset/t,this.sphere}}const wt=new Et;function Mt(e){return null!=e?(wt.offset=e,wt):null}new Ct;new At;const It=(0,xt.a)();function Rt(e,t,r,n){const i=r.typedBuffer,o=r.typedBufferStride,a=e.length;n*=o;for(let s=0;s<a;++s){const r=2*e[s];i[n]=t[r],i[n+1]=t[r+1],n+=o}}function Nt(e,t,r,n,i){const o=r.typedBuffer,a=r.typedBufferStride,s=e.length;if(n*=a,null==i||1===i)for(let l=0;l<s;++l){const r=3*e[l];o[n]=t[r],o[n+1]=t[r+1],o[n+2]=t[r+2],n+=a}else for(let l=0;l<s;++l){const r=3*e[l];for(let e=0;e<i;++e)o[n]=t[r],o[n+1]=t[r+1],o[n+2]=t[r+2],n+=a}}function Lt(e,t,r,n,i=1){const o=r.typedBuffer,a=r.typedBufferStride,s=e.length;if(n*=a,1===i)for(let l=0;l<s;++l){const r=4*e[l];o[n]=t[r],o[n+1]=t[r+1],o[n+2]=t[r+2],o[n+3]=t[r+3],n+=a}else for(let l=0;l<s;++l){const r=4*e[l];for(let e=0;e<i;++e)o[n]=t[r],o[n+1]=t[r+1],o[n+2]=t[r+2],o[n+3]=t[r+3],n+=a}}function Pt(e,t,r,n,i,o=1){if(!r)return void Nt(e,t,n,i,o);const s=n.typedBuffer,l=n.typedBufferStride,c=e.length,u=r[0],d=r[1],h=r[2],f=r[4],m=r[5],p=r[6],v=r[8],g=r[9],_=r[10],x=r[12],T=r[13],b=r[14];i*=l;let A=0,S=0,y=0;const O=(0,a.y)(r)?e=>{A=t[e]+x,S=t[e+1]+T,y=t[e+2]+b}:e=>{const r=t[e],n=t[e+1],i=t[e+2];A=u*r+f*n+v*i+x,S=d*r+m*n+g*i+T,y=h*r+p*n+_*i+b};if(1===o)for(let a=0;a<c;++a)O(3*e[a]),s[i]=A,s[i+1]=S,s[i+2]=y,i+=l;else for(let a=0;a<c;++a){O(3*e[a]);for(let e=0;e<o;++e)s[i]=A,s[i+1]=S,s[i+2]=y,i+=l}}function Ht(e,t,r,n,i,o=1){if(!r)return void Nt(e,t,n,i,o);const s=r,l=n.typedBuffer,c=n.typedBufferStride,u=e.length,d=s[0],h=s[1],f=s[2],m=s[4],p=s[5],v=s[6],g=s[8],_=s[9],x=s[10],T=!(0,a.z)(s),b=1e-6,A=1-b;i*=c;let S=0,y=0,O=0;const C=(0,a.y)(s)?e=>{S=t[e],y=t[e+1],O=t[e+2]}:e=>{const r=t[e],n=t[e+1],i=t[e+2];S=d*r+m*n+g*i,y=h*r+p*n+_*i,O=f*r+v*n+x*i};if(1===o)if(T)for(let a=0;a<u;++a){C(3*e[a]);const t=S*S+y*y+O*O;if(t<A&&t>b){const e=1/Math.sqrt(t);l[i]=S*e,l[i+1]=y*e,l[i+2]=O*e}else l[i]=S,l[i+1]=y,l[i+2]=O;i+=c}else for(let a=0;a<u;++a)C(3*e[a]),l[i]=S,l[i+1]=y,l[i+2]=O,i+=c;else for(let a=0;a<u;++a){if(C(3*e[a]),T){const e=S*S+y*y+O*O;if(e<A&&e>b){const t=1/Math.sqrt(e);S*=t,y*=t,O*=t}}for(let e=0;e<o;++e)l[i]=S,l[i+1]=y,l[i+2]=O,i+=c}}function Dt(e,t,r,n,i,o=1){if(!r)return void Lt(e,t,n,i,o);const s=r,l=n.typedBuffer,c=n.typedBufferStride,u=e.length,d=s[0],h=s[1],f=s[2],m=s[4],p=s[5],v=s[6],g=s[8],_=s[9],x=s[10],T=!(0,a.z)(s),b=1e-6,A=1-b;if(i*=c,1===o)for(let a=0;a<u;++a){const r=4*e[a],n=t[r],o=t[r+1],s=t[r+2],u=t[r+3];let S=d*n+m*o+g*s,y=h*n+p*o+_*s,O=f*n+v*o+x*s;if(T){const e=S*S+y*y+O*O;if(e<A&&e>b){const t=1/Math.sqrt(e);S*=t,y*=t,O*=t}}l[i]=S,l[i+1]=y,l[i+2]=O,l[i+3]=u,i+=c}else for(let a=0;a<u;++a){const r=4*e[a],n=t[r],s=t[r+1],u=t[r+2],S=t[r+3];let y=d*n+m*s+g*u,O=h*n+p*s+_*u,C=f*n+v*s+x*u;if(T){const e=y*y+O*O+C*C;if(e<A&&e>b){const t=1/Math.sqrt(e);y*=t,O*=t,C*=t}}for(let e=0;e<o;++e)l[i]=y,l[i+1]=O,l[i+2]=C,l[i+3]=S,i+=c}}function Ft(e,t,r,n,i,o=1){const a=n.typedBuffer,s=n.typedBufferStride,l=e.length;if(i*=s,r!==t.length||4!==r)if(1!==o)if(4!==r)for(let c=0;c<l;++c){const r=3*e[c];for(let e=0;e<o;++e)a[i]=t[r],a[i+1]=t[r+1],a[i+2]=t[r+2],a[i+3]=255,i+=s}else for(let c=0;c<l;++c){const r=4*e[c];for(let e=0;e<o;++e)a[i]=t[r],a[i+1]=t[r+1],a[i+2]=t[r+2],a[i+3]=t[r+3],i+=s}else{if(4===r){for(let r=0;r<l;++r){const n=4*e[r];a[i]=t[n],a[i+1]=t[n+1],a[i+2]=t[n+2],a[i+3]=t[n+3],i+=s}return}for(let r=0;r<l;++r){const n=3*e[r];a[i]=t[n],a[i+1]=t[n+1],a[i+2]=t[n+2],a[i+3]=255,i+=s}}else{a[i]=t[0],a[i+1]=t[1],a[i+2]=t[2],a[i+3]=t[3];const e=new Uint32Array(n.typedBuffer.buffer,n.start),r=s/4,c=e[i/=4];i+=r;const u=l*o;for(let t=1;t<u;++t)e[i]=c,i+=r}}function Vt(e,t,r,n){const i=r.typedBuffer,o=r.typedBufferStride,a=e.length,s=t[0];n*=o;for(let l=0;l<a;++l)i[n]=s,n+=o}function Bt(e,t,r,n,i=1){const o=t.typedBuffer,a=t.typedBufferStride;if(n*=a,1===i)for(let s=0;s<r;++s)o[n]=e[0],o[n+1]=e[1],o[n+2]=e[2],o[n+3]=e[3],n+=a;else for(let s=0;s<r;++s)for(let t=0;t<i;++t)o[n]=e[0],o[n+1]=e[1],o[n+2]=e[2],o[n+3]=e[3],n+=a}function zt(e,t,r,n,i,o){for(const a of t.fields.keys()){const t=e.vertexAttributes.get(a),s=e.indices.get(a);if(t&&s)Ut(a,t,s,r,n,i,o);else if(a===le.r.OBJECTANDLAYERIDCOLOR&&null!=e.objectAndLayerIdColor){const t=e.indices.get(le.r.POSITION);if((0,W.vA)(!!t,`No buffer view for ${a}`),t){const r=t.length,n=i.getField(a,f.XP);Bt(e.objectAndLayerIdColor,n,r,o)}}}}function Ut(e,t,r,n,i,o,a){switch(e){case le.r.POSITION:{(0,W.vA)(3===t.size);const i=o.getField(e,f.xs);(0,W.vA)(!!i,`No buffer view for ${e}`),i&&Pt(r,t.data,n,i,a);break}case le.r.NORMAL:{(0,W.vA)(3===t.size);const n=o.getField(e,f.xs);(0,W.vA)(!!n,`No buffer view for ${e}`),n&&Ht(r,t.data,i,n,a);break}case le.r.NORMALCOMPRESSED:{(0,W.vA)(2===t.size);const n=o.getField(e,f.mJ);(0,W.vA)(!!n,`No buffer view for ${e}`),n&&Rt(r,t.data,n,a);break}case le.r.UV0:{(0,W.vA)(2===t.size);const n=o.getField(e,f.gH);(0,W.vA)(!!n,`No buffer view for ${e}`),n&&Rt(r,t.data,n,a);break}case le.r.COLOR:case le.r.SYMBOLCOLOR:{const n=o.getField(e,f.XP);(0,W.vA)(!!n,`No buffer view for ${e}`),(0,W.vA)(3===t.size||4===t.size),!n||3!==t.size&&4!==t.size||Ft(r,t.data,t.size,n,a);break}case le.r.COLORFEATUREATTRIBUTE:{const n=o.getField(e,f.Y$);(0,W.vA)(!!n,`No buffer view for ${e}`),(0,W.vA)(1===t.size),n&&1===t.size&&Vt(r,t.data,n,a);break}case le.r.TANGENT:{(0,W.vA)(4===t.size);const n=o.getField(e,f.Eq);(0,W.vA)(!!n,`No buffer view for ${e}`),n&&Dt(r,t.data,i,n,a);break}case le.r.PROFILERIGHT:case le.r.PROFILEUP:case le.r.PROFILEVERTEXANDNORMAL:case le.r.FEATUREVALUE:{(0,W.vA)(4===t.size);const n=o.getField(e,f.Eq);(0,W.vA)(!!n,`No buffer view for ${e}`),n&&Lt(r,t.data,n,a)}}}class Wt{constructor(e){this.vertexBufferLayout=e}elementCount(e){return e.indices.get(le.r.POSITION).length}write(e,t,r,n,i){zt(r,this.vertexBufferLayout,e,t,n,i)}}var Gt=r(78087),kt=r(18439),$t=r(8982),jt=r(94836),qt=r(19889),Xt=r(28160),Yt=r(75887),Zt=r(37985),Qt=r(8114);Se.MT.LESS,Se.MT.ALWAYS;const Kt={mask:255},Jt={function:{func:Se.MT.ALWAYS,ref:V.dd.OutlineVisualElementMask,mask:V.dd.OutlineVisualElementMask},operation:{fail:Se.eA.KEEP,zFail:Se.eA.KEEP,zPass:Se.eA.ZERO}},er={function:{func:Se.MT.ALWAYS,ref:V.dd.OutlineVisualElementMask,mask:V.dd.OutlineVisualElementMask},operation:{fail:Se.eA.KEEP,zFail:Se.eA.KEEP,zPass:Se.eA.REPLACE}};Se.MT.EQUAL,V.dd.OutlineVisualElementMask,V.dd.OutlineVisualElementMask,Se.eA.KEEP,Se.eA.KEEP,Se.eA.KEEP,Se.MT.NOTEQUAL,V.dd.OutlineVisualElementMask,V.dd.OutlineVisualElementMask,Se.eA.KEEP,Se.eA.KEEP,Se.eA.KEEP;var tr=r(26723);function rr({normalTexture:e,metallicRoughnessTexture:t,metallicFactor:r,roughnessFactor:n,emissiveTexture:i,emissiveFactor:o,occlusionTexture:a}){return null==e&&null==t&&null==i&&(null==o||(0,l.k)(o,c.Z))&&null==a&&(null==n||1===n)&&(null==r||1===r||0===r)}const nr=[1,1,.5],ir=[0,.6,.2],or=[0,1,.2];var ar=r(1215),sr=r(46896);class lr extends jt.Zo{constructor(){super(...arguments),this.isSchematic=!1,this.usePBR=!1,this.mrrFactors=(0,c.g)(nr),this.hasVertexColors=!1,this.hasSymbolColors=!1,this.doubleSided=!1,this.doubleSidedType="normal",this.cullFace=V.s2.Back,this.isInstanced=!1,this.hasInstancedColor=!1,this.emissiveFactor=(0,c.f)(0,0,0),this.instancedDoublePrecision=!1,this.normalType=ht.W.Attribute,this.receiveSSAO=!0,this.receiveShadows=!0,this.castShadows=!0,this.shadowMappingEnabled=!1,this.ambient=(0,c.f)(.2,.2,.2),this.diffuse=(0,c.f)(.8,.8,.8),this.externalColor=(0,kt.f)(1,1,1,1),this.colorMixMode="multiply",this.opacity=1,this.layerOpacity=1,this.origin=(0,c.c)(),this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.offsetTransparentBackfaces=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.modelTransformation=null,this.transparent=!1,this.writeDepth=!0,this.customDepthTest=V.it.Less,this.textureAlphaMode=V.sf.Blend,this.textureAlphaCutoff=qt.H,this.textureAlphaPremultiplied=!1,this.hasOccludees=!1,this.renderOccluded=vt.m$.Occlude}}jt.gy;class cr extends Yt.w{initializeConfiguration(e,t){t.spherical=e.viewingMode===ct.RT.Global,t.doublePrecisionRequiresObfuscation=e.rctx.driverTest.doublePrecisionRequiresObfuscation.result,t.textureCoordinateType=t.hasColorTexture||t.hasMetallicRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture||t.hasNormalTexture?$t.q.Default:$t.q.None,t.objectAndLayerIdColorInstanced=t.instanced}initializeProgram(e){return this._initializeProgram(e,cr.shader)}_initializeProgram(e,t){return new Qt.B(e.rctx,t.get().build(this.configuration),Zt.D)}_convertDepthTestFunction(e){return e===V.it.Lequal?Se.MT.LEQUAL:Se.MT.LESS}_makePipeline(e,t){const r=this.configuration,n=e===tr.y.NONE,i=e===tr.y.FrontFace;return(0,sr.Ey)({blending:r.output!==dt.V.Color&&r.output!==dt.V.Alpha||!r.transparent?null:n?gt.V0:(0,gt.ez)(e),culling:ur(r)?(0,sr.Xt)(r.cullFace):null,depthTest:{func:(0,gt.K_)(e,this._convertDepthTestFunction(r.customDepthTest))},depthWrite:(n||i)&&r.writeDepth?sr.kn:null,colorWrite:sr.wE,stencilWrite:r.hasOccludees?Kt:null,stencilTest:r.hasOccludees?t?er:Jt:null,polygonOffset:n||i?null:(0,gt.aB)(r.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this._makePipeline(this.configuration.transparencyPassType,!0),this._makePipeline(this.configuration.transparencyPassType,!1)}getPipelineState(e,t){return t?this._occludeePipelineState:super.getPipelineState(e,t)}}function ur(e){return e.cullFace!==V.s2.None||!e.hasSlicePlane&&!e.transparent&&!e.doubleSidedMode}cr.shader=new Xt.$(ar.D,(()=>r.e(6505).then(r.bind(r,16505))));var dr=r(71457),hr=r(83853),fr=r(52867);class mr extends hr.K{}(0,dr._)([(0,hr.W)({constValue:!0})],mr.prototype,"hasSliceHighlight",void 0),(0,dr._)([(0,hr.W)({constValue:!1})],mr.prototype,"hasSliceInVertexProgram",void 0),(0,dr._)([(0,hr.W)({constValue:!1})],mr.prototype,"instancedDoublePrecision",void 0),(0,dr._)([(0,hr.W)({constValue:!1})],mr.prototype,"hasModelTransformation",void 0),(0,dr._)([(0,hr.W)({constValue:fr.c.Pass})],mr.prototype,"pbrTextureBindType",void 0);class pr extends mr{constructor(){super(...arguments),this.output=dt.V.Color,this.alphaDiscardMode=V.sf.Opaque,this.doubleSidedMode=ft.W.None,this.pbrMode=mt.A9.Disabled,this.cullFace=V.s2.None,this.transparencyPassType=tr.y.NONE,this.normalType=ht.W.Attribute,this.textureCoordinateType=$t.q.None,this.customDepthTest=V.it.Less,this.spherical=!1,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.hasVerticalOffset=!1,this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.hasColorTexture=!1,this.hasMetallicRoughnessTexture=!1,this.hasEmissionTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.hasScreenSizePerspective=!1,this.hasVertexTangents=!1,this.hasOccludees=!1,this.hasMultipassTerrain=!1,this.hasModelTransformation=!1,this.offsetBackfaces=!1,this.vvSize=!1,this.vvColor=!1,this.receiveShadows=!1,this.receiveAmbientOcclusion=!1,this.textureAlphaPremultiplied=!1,this.instanced=!1,this.instancedColor=!1,this.objectAndLayerIdColorInstanced=!1,this.instancedDoublePrecision=!1,this.doublePrecisionRequiresObfuscation=!1,this.writeDepth=!0,this.transparent=!1,this.enableOffset=!0,this.cullAboveGround=!1,this.snowCover=!1,this.hasColorTextureTransform=!1,this.hasEmissionTextureTransform=!1,this.hasNormalTextureTransform=!1,this.hasOcclusionTextureTransform=!1,this.hasMetallicRoughnessTextureTransform=!1}}(0,dr._)([(0,hr.W)({count:dt.V.COUNT})],pr.prototype,"output",void 0),(0,dr._)([(0,hr.W)({count:V.sf.COUNT})],pr.prototype,"alphaDiscardMode",void 0),(0,dr._)([(0,hr.W)({count:ft.W.COUNT})],pr.prototype,"doubleSidedMode",void 0),(0,dr._)([(0,hr.W)({count:mt.A9.COUNT})],pr.prototype,"pbrMode",void 0),(0,dr._)([(0,hr.W)({count:V.s2.COUNT})],pr.prototype,"cullFace",void 0),(0,dr._)([(0,hr.W)({count:tr.y.COUNT})],pr.prototype,"transparencyPassType",void 0),(0,dr._)([(0,hr.W)({count:ht.W.COUNT})],pr.prototype,"normalType",void 0),(0,dr._)([(0,hr.W)({count:$t.q.COUNT})],pr.prototype,"textureCoordinateType",void 0),(0,dr._)([(0,hr.W)({count:V.it.COUNT})],pr.prototype,"customDepthTest",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"spherical",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasVertexColors",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasSymbolColors",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasVerticalOffset",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasSlicePlane",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasSliceHighlight",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasColorTexture",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasMetallicRoughnessTexture",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasEmissionTexture",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasOcclusionTexture",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasNormalTexture",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasScreenSizePerspective",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasVertexTangents",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasOccludees",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasMultipassTerrain",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasModelTransformation",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"offsetBackfaces",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"vvSize",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"vvColor",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"receiveShadows",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"receiveAmbientOcclusion",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"textureAlphaPremultiplied",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"instanced",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"instancedColor",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"objectAndLayerIdColorInstanced",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"instancedDoublePrecision",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"doublePrecisionRequiresObfuscation",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"writeDepth",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"transparent",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"enableOffset",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"cullAboveGround",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"snowCover",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasColorTextureTransform",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasEmissionTextureTransform",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasNormalTextureTransform",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasOcclusionTextureTransform",void 0),(0,dr._)([(0,hr.W)()],pr.prototype,"hasMetallicRoughnessTextureTransform",void 0),(0,dr._)([(0,hr.W)({constValue:!0})],pr.prototype,"hasVvInstancing",void 0),(0,dr._)([(0,hr.W)({constValue:!1})],pr.prototype,"useCustomDTRExponentForWater",void 0),(0,dr._)([(0,hr.W)({constValue:!1})],pr.prototype,"supportsTextureAtlas",void 0),(0,dr._)([(0,hr.W)({constValue:!0})],pr.prototype,"useFillLights",void 0);var vr=r(77084);class gr extends cr{initializeConfiguration(e,t){super.initializeConfiguration(e,t),t.hasMetallicRoughnessTexture=!1,t.hasEmissionTexture=!1,t.hasOcclusionTexture=!1,t.hasNormalTexture=!1,t.hasModelTransformation=!1,t.normalType=ht.W.Attribute,t.doubleSidedMode=ft.W.WindingOrder,t.hasVertexTangents=!1}initializeProgram(e){return this._initializeProgram(e,gr.shader)}}gr.shader=new Xt.$(vr.R,(()=>r.e(1345).then(r.bind(r,81345))));class _r extends vt.im{constructor(e){super(e,br),this.supportsEdges=!0,this._configuration=new pr,this._vertexBufferLayout=Ar(this.parameters)}isVisibleForOutput(e){return e!==dt.V.Shadow&&e!==dt.V.ShadowExcludeHighlight&&e!==dt.V.ShadowHighlight||this.parameters.castShadows}isVisible(){const e=this.parameters;if(!super.isVisible()||0===e.layerOpacity)return!1;const{hasInstancedColor:t,hasVertexColors:r,hasSymbolColors:n,vvColor:i}=e,o="replace"===e.colorMixMode,a=e.opacity>0,s=e.externalColor&&e.externalColor[3]>0,l=t||i||n;return r&&l?o||a:r?o?s:a:l?o||a:o?s:a}getConfiguration(e,t){return this._configuration.output=e,this._configuration.hasNormalTexture=!!this.parameters.normalTextureId,this._configuration.hasColorTexture=!!this.parameters.textureId,this._configuration.hasVertexTangents=this.parameters.hasVertexTangents,this._configuration.instanced=this.parameters.isInstanced,this._configuration.instancedDoublePrecision=this.parameters.instancedDoublePrecision,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.hasVerticalOffset=null!=this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=null!=this.parameters.screenSizePerspective,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasSliceHighlight=this.parameters.hasSliceHighlight,this._configuration.alphaDiscardMode=this.parameters.textureAlphaMode,this._configuration.normalType=this.parameters.normalType,this._configuration.transparent=this.parameters.transparent,this._configuration.writeDepth=this.parameters.writeDepth,null!=this.parameters.customDepthTest&&(this._configuration.customDepthTest=this.parameters.customDepthTest),this._configuration.hasOccludees=this.parameters.hasOccludees,this._configuration.cullFace=this.parameters.hasSlicePlane?V.s2.None:this.parameters.cullFace,this._configuration.hasMultipassTerrain=t.multipassTerrain.enabled,this._configuration.cullAboveGround=t.multipassTerrain.cullAboveGround,this._configuration.hasModelTransformation=null!=this.parameters.modelTransformation,e!==dt.V.Color&&e!==dt.V.Alpha||(this._configuration.hasVertexColors=this.parameters.hasVertexColors,this._configuration.hasSymbolColors=this.parameters.hasSymbolColors,this.parameters.treeRendering?this._configuration.doubleSidedMode=ft.W.WindingOrder:this._configuration.doubleSidedMode=this.parameters.doubleSided&&"normal"===this.parameters.doubleSidedType?ft.W.View:this.parameters.doubleSided&&"winding-order"===this.parameters.doubleSidedType?ft.W.WindingOrder:ft.W.None,this._configuration.instancedColor=this.parameters.hasInstancedColor,this._configuration.receiveShadows=this.parameters.receiveShadows&&this.parameters.shadowMappingEnabled,this._configuration.receiveAmbientOcclusion=!!t.ssaoHelper.active&&this.parameters.receiveSSAO,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.textureAlphaPremultiplied=!!this.parameters.textureAlphaPremultiplied,this._configuration.pbrMode=this.parameters.usePBR?this.parameters.isSchematic?mt.A9.Schematic:mt.A9.Normal:mt.A9.Disabled,this._configuration.hasMetallicRoughnessTexture=!!this.parameters.metallicRoughnessTextureId,this._configuration.hasEmissionTexture=!!this.parameters.emissiveTextureId,this._configuration.hasOcclusionTexture=!!this.parameters.occlusionTextureId,this._configuration.offsetBackfaces=!(!this.parameters.transparent||!this.parameters.offsetTransparentBackfaces),this._configuration.transparencyPassType=t.transparencyPassType,this._configuration.enableOffset=t.camera.relativeElevation<gt.xt,this._configuration.snowCover=this.hasSnowCover(t),this._configuration.hasColorTextureTransform=!!this.parameters.colorTextureTransformMatrix,this._configuration.hasNormalTextureTransform=!!this.parameters.normalTextureTransformMatrix,this._configuration.hasEmissionTextureTransform=!!this.parameters.emissiveTextureTransformMatrix,this._configuration.hasOcclusionTextureTransform=!!this.parameters.occlusionTextureTransformMatrix,this._configuration.hasMetallicRoughnessTextureTransform=!!this.parameters.metallicRoughnessTextureTransformMatrix),this._configuration}hasSnowCover(e){return null!=e.weather&&e.weatherVisible&&"snowy"===e.weather.type&&"enabled"===e.weather.snowCover}intersect(e,t,r,n,i,o){if(null!=this.parameters.verticalOffset){const e=r.camera;(0,l.s)(wr,t[12],t[13],t[14]);let o=null;switch(r.viewingMode){case ct.RT.Global:o=(0,l.n)(Cr,wr);break;case ct.RT.Local:o=(0,l.c)(Cr,Or)}let a=0;const s=(0,l.b)(Mr,wr,e.eye),c=(0,l.l)(s),u=(0,l.g)(s,s,1/c);let d=null;this.parameters.screenSizePerspective&&(d=(0,l.e)(o,u)),a+=(0,Gt.kE)(e,c,this.parameters.verticalOffset,d??0,this.parameters.screenSizePerspective),(0,l.g)(o,o,a),(0,l.t)(Er,o,r.transform.inverseRotation),n=(0,l.b)(Sr,n,Er),i=(0,l.b)(yr,i,Er)}(0,Gt.Uy)(e,r,n,i,Mt(r.verticalOffset),o)}requiresSlot(e,t){return(t===dt.V.Color||t===dt.V.Alpha||t===dt.V.Depth||t===dt.V.Normal||t===dt.V.Shadow||t===dt.V.ShadowHighlight||t===dt.V.ShadowExcludeHighlight||t===dt.V.Highlight||t===dt.V.ObjectAndLayerIdColor)&&(e===(this.parameters.transparent?this.parameters.writeDepth?lt.TRANSPARENT_MATERIAL:lt.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL:lt.OPAQUE_MATERIAL)||e===lt.DRAPED_MATERIAL)}createGLMaterial(e){return new xr(e)}createBufferWriter(){return new Wt(this._vertexBufferLayout)}}class xr extends pt.m{constructor(e){super({...e,...e.material.parameters})}_updateShadowState(e){e.shadowMap.enabled!==this._material.parameters.shadowMappingEnabled&&this._material.setParameters({shadowMappingEnabled:e.shadowMap.enabled})}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.hasOccludees&&this._material.setParameters({hasOccludees:e.hasOccludees})}beginSlot(e){this._output!==dt.V.Color&&this._output!==dt.V.Alpha||(this._updateShadowState(e),this._updateOccludeeState(e));const t=this._material.parameters;this.updateTexture(t.textureId);const r=e.camera.viewInverseTransposeMatrix;return(0,l.s)(t.origin,r[3],r[7],r[11]),this._material.setParameters(this.textureBindParameters),this.ensureTechnique(t.treeRendering?gr:cr,e)}}class Tr extends lr{constructor(){super(...arguments),this.initTextureTransparent=!1,this.treeRendering=!1,this.hasVertexTangents=!1}}const br=new Tr;function Ar(e){const t=(0,ut.BP)().vec3f(le.r.POSITION);return e.normalType===ht.W.Compressed?t.vec2i16(le.r.NORMALCOMPRESSED,{glNormalized:!0}):t.vec3f(le.r.NORMAL),e.hasVertexTangents&&t.vec4f(le.r.TANGENT),(e.textureId||e.normalTextureId||e.metallicRoughnessTextureId||e.emissiveTextureId||e.occlusionTextureId)&&t.vec2f(le.r.UV0),e.hasVertexColors&&t.vec4u8(le.r.COLOR),e.hasSymbolColors&&t.vec4u8(le.r.SYMBOLCOLOR),(0,me.A)("enable-feature:objectAndLayerId-rendering")&&t.vec4u8(le.r.OBJECTANDLAYERIDCOLOR),t}const Sr=(0,c.c)(),yr=(0,c.c)(),Or=(0,c.f)(0,0,1),Cr=(0,c.c)(),Er=(0,c.c)(),wr=(0,c.c)(),Mr=(0,c.c)(),Ir=N.A.getLogger("geoscene.views.3d.layers.graphics.objectResourceUtils");async function Rr(e,t){const r=await Nr(e,t),n=await Vr(r.textureDefinitions??{},t);let i=0;for(const o in n)if(n.hasOwnProperty(o)){const e=n[o];i+=e?.image?e.image.width*e.image.height*4:0}return{resource:r,textures:n,size:i+(0,I.iL)(r)}}async function Nr(e,t){const r=null!=t&&t.streamDataRequester;if(r)return Lr(e,r,t);const n=await(0,M.Ke)((0,w["default"])(e,t));if(!0===n.ok)return n.value.data;(0,P.QP)(n.error),Pr(n.error)}async function Lr(e,t,r){const n=await(0,M.Ke)(t.request(e,"json",r));if(!0===n.ok)return n.value;(0,P.QP)(n.error),Pr(n.error.details.url)}function Pr(e){throw new R.A("",`Request for object resource failed: ${e}`)}function Hr(e){const t=e.params,r=t.topology;let n=!0;switch(t.vertexAttributes||(Ir.warn("Geometry must specify vertex attributes"),n=!1),t.topology){case"PerAttributeArray":break;case"Indexed":case null:case void 0:{const e=t.faces;if(e){if(t.vertexAttributes)for(const r in t.vertexAttributes){const t=e[r];t&&t.values?(null!=t.valueType&&"UInt32"!==t.valueType&&(Ir.warn(`Unsupported indexed geometry indices type '${t.valueType}', only UInt32 is currently supported`),n=!1),null!=t.valuesPerElement&&1!==t.valuesPerElement&&(Ir.warn(`Unsupported indexed geometry values per element '${t.valuesPerElement}', only 1 is currently supported`),n=!1)):(Ir.warn(`Indexed geometry does not specify face indices for '${r}' attribute`),n=!1)}}else Ir.warn("Indexed geometries must specify faces"),n=!1;break}default:Ir.warn(`Unsupported topology '${r}'`),n=!1}e.params.material||(Ir.warn("Geometry requires material"),n=!1);const i=e.params.vertexAttributes;for(const o in i)i[o].values||(Ir.warn("Geometries with externally defined attributes are not yet supported"),n=!1);return n}function Dr(e,t){const r=new Array,n=new Array,i=new Array,o=new L.O,a=e.resource,s=H.R.parse(a.version||"1.0","wosr");Ur.validate(s);const l=a.model.name,u=a.model.geometries,d=a.materialDefinitions??{},h=e.textures;let f=0;const m=new Map;for(let p=0;p<u.length;p++){const e=u[p];if(!Hr(e))continue;const a=zr(e),s=e.params.vertexAttributes,l=[];for(const t in s){const e=s[t],r=e.values;l.push([t,new F.n(r,e.valuesPerElement,!0)])}const v=[];if("PerAttributeArray"!==e.params.topology){const t=e.params.faces;for(const e in t)v.push([e,t[e].values])}const g=a.texture,_=h&&h[g];if(_&&!m.has(g)){const{image:e,parameters:t}=_,r=new ot(e,t);n.push(r),m.set(g,r)}const x=m.get(g),T=x?x.id:void 0,b=a.material;let A=o.get(b,g);if(null==A){const e=d[b.substring(b.lastIndexOf("/")+1)].params;1===e.transparency&&(e.transparency=0);const r=_&&_.alphaChannelUsage,n=e.transparency>0||"transparency"===r||"maskAndTransparency"===r,i=_?Br(_.alphaChannelUsage):void 0,a={ambient:(0,c.g)(e.diffuse),diffuse:(0,c.g)(e.diffuse),opacity:1-(e.transparency||0),transparent:n,textureAlphaMode:i,textureAlphaCutoff:.33,textureId:T,initTextureTransparent:!0,doubleSided:!0,cullFace:V.s2.None,colorMixMode:e.externalColorMixMode||"tint",textureAlphaPremultiplied:_?.parameters.preMultiplyAlpha??!1};null!=t&&t.materialParamsMixin&&Object.assign(a,t.materialParamsMixin),A=new _r(a),o.set(b,g,A)}i.push(A);const S=new de(A,l,v);f+=v.find((e=>e[0]===le.r.POSITION))?.[1].length??0,r.push(S)}return{engineResources:[{name:l,stageResources:{textures:n,materials:i,geometries:r},pivotOffset:a.model.pivotOffset,numberOfVertices:f,lodThreshold:null}],referenceBoundingBox:Fr(r)}}function Fr(e){const t=(0,u.Ie)();return e.forEach((e=>{const r=e.boundingInfo;null!=r&&((0,u.iT)(t,r.bbMin),(0,u.iT)(t,r.bbMax))})),t}async function Vr(e,t){const r=new Array;for(const o in e){const n=e[o],i=n.images[0].data;if(!i){Ir.warn("Externally referenced texture data is not yet supported");continue}const a=n.encoding+";base64,"+i,s="/textureDefinitions/"+o,l="rgba"===n.channels?n.alphaChannelUsage||"transparency":"none",c={noUnpackFlip:!0,wrap:{s:Se.pF.REPEAT,t:Se.pF.REPEAT},preMultiplyAlpha:Br(l)!==V.sf.Opaque},u=null!=t&&t.disableTextures?Promise.resolve(null):(0,D.D)(a,t);r.push(u.then((e=>({refId:s,image:e,parameters:c,alphaChannelUsage:l}))))}const n=await Promise.all(r),i={};for(const o of n)i[o.refId]=o;return i}function Br(e){switch(e){case"mask":return V.sf.Mask;case"maskAndTransparency":return V.sf.MaskBlend;case"none":return V.sf.Opaque;default:return V.sf.Blend}}function zr(e){const t=e.params;return{id:1,material:t.material,texture:t.texture,region:t.texture}}const Ur=new H.R(1,2,"wosr");var Wr=r(70433);async function Gr(e,t){const r=kr((0,n.EM)(e));if("wosr"===r.fileType){const e=await(t.cache?t.cache.loadWOSR(r.url,t):Rr(r.url,t)),{engineResources:n,referenceBoundingBox:i}=Dr(e,t);return{lods:n,referenceBoundingBox:i,isEsriSymbolResource:!1,isWosr:!0}}const i=await(t.cache?t.cache.loadGLTF(r.url,t,!!t.usePBR):(0,T.y)(new x.R(t.streamDataRequester),r.url,t,t.usePBR)),o=i.model.meta?.ESRI_proxyEllipsoid,a=i.meta.isEsriSymbolResource&&null!=o&&i.meta.uri.includes("/RealisticTrees/");a&&!i.customMeta.geosceneTreeRendering&&(i.customMeta.geosceneTreeRendering=!0,Zr(i,o));const s=!!t.usePBR,l=i.meta.isEsriSymbolResource?{usePBR:s,isSchematic:!1,treeRendering:a,mrrFactors:[...or]}:{usePBR:s,isSchematic:!1,treeRendering:!1,mrrFactors:[...nr]},c={...t.materialParamsMixin,treeRendering:a},{engineResources:u,referenceBoundingBox:d}=$r(i,l,c,t.skipHighLods&&null==r.specifiedLodIndex?{skipHighLods:!0}:{skipHighLods:!1,singleLodIndex:r.specifiedLodIndex});return{lods:u,referenceBoundingBox:d,isEsriSymbolResource:i.meta.isEsriSymbolResource,isWosr:!1}}function kr(e){const t=e.match(/(.*\.(gltf|glb))(\?lod=([0-9]+))?$/);return t?{fileType:"gltf",url:t[1],specifiedLodIndex:null!=t[4]?Number(t[4]):null}:e.match(/(.*\.(json|json\.gz))$/)?{fileType:"wosr",url:e,specifiedLodIndex:null}:{fileType:"unknown",url:e,specifiedLodIndex:null}}function $r(e,t,r,n){const i=e.model,o=new Array,a=new Map,s=new Map,l=i.lods.length,c=(0,u.Ie)();return i.lods.forEach(((e,d)=>{const h=!0===n.skipHighLods&&(l>1&&0===d||l>3&&1===d)||!1===n.skipHighLods&&null!=n.singleLodIndex&&d!==n.singleLodIndex;if(h&&0!==d)return;const f=new E(e.name,e.lodThreshold,[0,0,0]);e.parts.forEach((e=>{const n=h?new _r({}):jr(i,e,f,t,r,a,s),{geometry:o,vertexCount:l}=qr(e,null!=n?n:new _r({})),m=o.boundingInfo;null!=m&&0===d&&((0,u.iT)(c,m.bbMin),(0,u.iT)(c,m.bbMax)),null!=n&&(f.stageResources.geometries.push(o),f.numberOfVertices+=l)})),h||o.push(f)})),{engineResources:o,referenceBoundingBox:c}}function jr(e,t,r,n,i,o,a){const s=t.material+(t.attributes.normal?"_normal":"")+(t.attributes.color?"_color":"")+(t.attributes.texCoord0?"_texCoord0":"")+(t.attributes.tangent?"_tangent":""),l=e.materials.get(t.material),c=null!=t.attributes.texCoord0,u=null!=t.attributes.normal;if(null==l)return null;const d=Yr(l.alphaMode);if(!o.has(s)){if(c){const t=(t,r=!1)=>{if(null!=t&&!a.has(t)){const n=e.textures.get(t);if(null!=n){const e=n.data;a.set(t,new ot((0,A.x3)(e)?e.data:e,{...n.parameters,preMultiplyAlpha:!(0,A.x3)(e)&&r,encoding:(0,A.x3)(e)&&null!=e.encoding?e.encoding:void 0}))}}};t(l.textureColor,d!==V.sf.Opaque),t(l.textureNormal),t(l.textureOcclusion),t(l.textureEmissive),t(l.textureMetallicRoughness)}const r=l.color[0]**(1/Wr.O),h=l.color[1]**(1/Wr.O),f=l.color[2]**(1/Wr.O),m=l.emissiveFactor[0]**(1/Wr.O),p=l.emissiveFactor[1]**(1/Wr.O),v=l.emissiveFactor[2]**(1/Wr.O),g=null!=l.textureColor&&c?a.get(l.textureColor):null,_=rr({normalTexture:l.textureNormal,metallicRoughnessTexture:l.textureMetallicRoughness,metallicFactor:l.metallicFactor,roughnessFactor:l.roughnessFactor,emissiveTexture:l.textureEmissive,emissiveFactor:l.emissiveFactor,occlusionTexture:l.textureOcclusion});o.set(s,new _r({...n,transparent:d===V.sf.Blend,customDepthTest:V.it.Lequal,textureAlphaMode:d,textureAlphaCutoff:l.alphaCutoff,diffuse:[r,h,f],ambient:[r,h,f],opacity:l.opacity,doubleSided:l.doubleSided,doubleSidedType:"winding-order",cullFace:l.doubleSided?V.s2.None:V.s2.Back,hasVertexColors:!!t.attributes.color,hasVertexTangents:!!t.attributes.tangent,normalType:u?ht.W.Attribute:ht.W.ScreenDerivative,castShadows:!0,receiveSSAO:!0,textureId:null!=g?g.id:void 0,colorMixMode:l.colorMixMode,normalTextureId:null!=l.textureNormal&&c?a.get(l.textureNormal).id:void 0,textureAlphaPremultiplied:null!=g&&!!g.parameters.preMultiplyAlpha,occlusionTextureId:null!=l.textureOcclusion&&c?a.get(l.textureOcclusion).id:void 0,emissiveTextureId:null!=l.textureEmissive&&c?a.get(l.textureEmissive).id:void 0,metallicRoughnessTextureId:null!=l.textureMetallicRoughness&&c?a.get(l.textureMetallicRoughness).id:void 0,emissiveFactor:[m,p,v],mrrFactors:_?[...ir]:[l.metallicFactor,l.roughnessFactor,n.mrrFactors[2]],isSchematic:_,colorTextureTransformMatrix:O(l.colorTextureTransform),normalTextureTransformMatrix:O(l.normalTextureTransform),occlusionTextureTransformMatrix:O(l.occlusionTextureTransform),emissiveTextureTransformMatrix:O(l.emissiveTextureTransform),metallicRoughnessTextureTransformMatrix:O(l.metallicRoughnessTextureTransform),...i}))}const h=o.get(s);if(r.stageResources.materials.push(h),c){const e=e=>{null!=e&&r.stageResources.textures.push(a.get(e))};e(l.textureColor),e(l.textureNormal),e(l.textureOcclusion),e(l.textureEmissive),e(l.textureMetallicRoughness)}return h}function qr(e,t){const r=e.attributes.position.count,n=(0,b.x)(e.indices||r,e.primitiveType),o=h(3*r),{typedBuffer:a,typedBufferStride:s}=e.attributes.position;(0,m.t)(o,a,e.transform,3,s);const l=[[le.r.POSITION,new F.n(o,3,!0)]],c=[[le.r.POSITION,n]];if(null!=e.attributes.normal){const t=h(3*r),{typedBuffer:o,typedBufferStride:a}=e.attributes.normal;(0,i.b)(Xr,e.transform),(0,m.a)(t,o,Xr,3,a),l.push([le.r.NORMAL,new F.n(t,3,!0)]),c.push([le.r.NORMAL,n])}if(null!=e.attributes.tangent){const t=h(4*r),{typedBuffer:o,typedBufferStride:a}=e.attributes.tangent;(0,i.b)(Xr,e.transform),(0,p.t)(t,o,Xr,4,a),l.push([le.r.TANGENT,new F.n(t,4,!0)]),c.push([le.r.TANGENT,n])}if(null!=e.attributes.texCoord0){const t=h(2*r),{typedBuffer:i,typedBufferStride:o}=e.attributes.texCoord0;(0,v.n)(t,i,2,o),l.push([le.r.UV0,new F.n(t,2,!0)]),c.push([le.r.UV0,n])}if(null!=e.attributes.color){const t=new Uint8Array(4*r);4===e.attributes.color.elementCount?e.attributes.color instanceof f.Eq?(0,p.s)(t,e.attributes.color,255):e.attributes.color instanceof f.XP?(0,_.c)(t,e.attributes.color):e.attributes.color instanceof f.Uz&&(0,p.s)(t,e.attributes.color,1/256):(t.fill(255),e.attributes.color instanceof f.xs?(0,m.s)(t,e.attributes.color,255,4):e.attributes.color instanceof f.eI?(0,g.c)(t,e.attributes.color.typedBuffer,4,e.attributes.color.typedBufferStride):e.attributes.color instanceof f.nS&&(0,m.s)(t,e.attributes.color,1/256,4)),l.push([le.r.COLOR,new F.n(t,4,!0)]),c.push([le.r.COLOR,n])}return{geometry:new de(t,l,c),vertexCount:r}}const Xr=(0,o.c)();function Yr(e){switch(e){case"BLEND":return V.sf.Blend;case"MASK":return V.sf.Mask;case"OPAQUE":case null:case void 0:return V.sf.Opaque}}function Zr(e,t){for(let r=0;r<e.model.lods.length;++r){const n=e.model.lods[r];for(const i of n.parts){const n=i.attributes.normal;if(null==n)return;const o=i.attributes.position,u=o.count,d=(0,c.c)(),h=(0,c.c)(),m=(0,c.c)(),p=new Uint8Array(4*u),v=new Float64Array(3*u),g=(0,a.a)((0,s.c)(),i.transform);let _=0,x=0;for(let a=0;a<u;a++){o.getVec(a,h),n.getVec(a,d),(0,l.m)(h,h,i.transform),(0,l.b)(m,h,t.center),(0,l.D)(m,m,t.radius);const s=m[2],c=(0,l.l)(m),u=Math.min(.45+.55*c*c,1);(0,l.D)(m,m,t.radius),null!==g&&(0,l.m)(m,m,g),(0,l.n)(m,m),r+1!==e.model.lods.length&&e.model.lods.length>1&&(0,l.h)(m,m,d,s>-1?.2:Math.min(-4*s-3.8,1)),v[_]=m[0],v[_+1]=m[1],v[_+2]=m[2],_+=3,p[x]=255*u,p[x+1]=255*u,p[x+2]=255*u,p[x+3]=255,x+=4}i.attributes.normal=new f.xs(v),i.attributes.color=new f.XP(p)}}}},36268:function(e,t,r){r.d(t,{k5:function(){return n}});var n;r(26011);!function(e){e[e.Multiply=1]="Multiply",e[e.Ignore=2]="Ignore",e[e.Replace=3]="Replace",e[e.Tint=4]="Tint"}(n||(n={}))},89223:function(e,t,r){r.d(t,{BP:function(){return l},l5:function(){return c}});r(44114),r(16573),r(78100),r(77936),r(37467),r(44732),r(79577);var n=r(44050),i=r(33099),o=r(28544);class a{constructor(e,t){this.layout=e,this.buffer="number"==typeof t?new ArrayBuffer(t*e.stride):t;for(const r of e.fields.keys()){const t=e.fields.get(r);this[r]=new t.constructor(this.buffer,t.offset,this.stride)}}get stride(){return this.layout.stride}get count(){return this.buffer.byteLength/this.stride}get byteLength(){return this.buffer.byteLength}getField(e,t){const r=this[e];return r&&r.elementCount===t.ElementCount&&r.elementType===t.ElementType?r:null}slice(e,t){return new a(this.layout,this.buffer.slice(e*this.stride,t*this.stride))}copyFrom(e,t=0,r=0,n=e.count){const i=this.stride;if(i%4==0){const o=new Uint32Array(e.buffer,t*i,n*i/4);new Uint32Array(this.buffer,r*i,n*i/4).set(o)}else{const o=new Uint8Array(e.buffer,t*i,n*i);new Uint8Array(this.buffer,r*i,n*i).set(o)}return this}}class s{constructor(e=null){this._stride=0,this._lastAligned=0,this._fields=new Map,e&&(this._stride=e.stride,e.fields.forEach((e=>this._fields.set(e[0],{...e[1],constructor:h(e[1].constructor)}))))}vec2f(e,t){return this._appendField(e,n.gH,t),this}vec2f64(e,t){return this._appendField(e,n.si,t),this}vec3f(e,t){return this._appendField(e,n.xs,t),this}vec3f64(e,t){return this._appendField(e,n.Xm,t),this}vec4f(e,t){return this._appendField(e,n.Eq,t),this}vec4f64(e,t){return this._appendField(e,n.Aj,t),this}mat3f(e,t){return this._appendField(e,n.jZ,t),this}mat3f64(e,t){return this._appendField(e,n.j0,t),this}mat4f(e,t){return this._appendField(e,n.Sx,t),this}mat4f64(e,t){return this._appendField(e,n.E$,t),this}vec4u8(e,t){return this._appendField(e,n.XP,t),this}f32(e,t){return this._appendField(e,n.Y$,t),this}f64(e,t){return this._appendField(e,n.qB,t),this}u8(e,t){return this._appendField(e,n.SL,t),this}u16(e,t){return this._appendField(e,n.h,t),this}i8(e,t){return this._appendField(e,n.bf,t),this}vec2i8(e,t){return this._appendField(e,n.D6,t),this}vec2i16(e,t){return this._appendField(e,n.mJ,t),this}vec2u8(e,t){return this._appendField(e,n.LC,t),this}vec4u16(e,t){return this._appendField(e,n.Uz,t),this}u32(e,t){return this._appendField(e,n.P,t),this}_appendField(e,t,r){if(this._fields.has(e))return void(0,o.vA)(!1,`${e} already added to vertex buffer layout`);const n=t.ElementCount*(0,i.GJ)(t.ElementType),a=this._stride;this._stride+=n,this._fields.set(e,{size:n,constructor:t,offset:a,optional:r})}createBuffer(e){return new a(this,e)}createView(e){return new a(this,e)}clone(){const e=new s;return e._stride=this._stride,e._fields=new Map,this._fields.forEach(((t,r)=>e._fields.set(r,t))),e.BufferType=this.BufferType,e}get stride(){if(this._lastAligned!==this._fields.size){let e=1;this._fields.forEach((t=>e=Math.max(e,(0,i.GJ)(t.constructor.ElementType)))),this._stride=Math.floor((this._stride+e-1)/e)*e,this._lastAligned=this._fields.size}return this._stride}get fields(){return this._fields}}function l(){return new s}class c{constructor(e){this.fields=new Array,e.fields.forEach(((e,t)=>{const r={...e,constructor:d(e.constructor)};this.fields.push([t,r])})),this.stride=e.stride}}const u=[n.Y$,n.gH,n.xs,n.Eq,n.jZ,n.Sx,n.qB,n.si,n.Xm,n.Aj,n.j0,n.E$,n.SL,n.LC,n.eI,n.XP,n.h,n.Yi,n.nS,n.Uz,n.P,n.An,n.H$,n.ml,n.bf,n.D6,n.m8,n.TX,n.Qt,n.mJ,n.Vp,n.E7,n.My,n.UL,n.zD,n.Y4];function d(e){return`${e.ElementType}_${e.ElementCount}`}function h(e){return f.get(e)}const f=new Map;u.forEach((e=>f.set(d(e),e)))},78306:function(e,t,r){r.d(t,{i$:function(){return c},oD:function(){return u},xJ:function(){return l}});var n=r(40443),i=r(68196),o=r(13418),a=r(80545);function s(e){e.varyings.add("linearDepth","float")}function l(e){e.vertex.uniforms.add(new o.G("nearFar",((e,t)=>t.camera.nearFar)))}function c(e){e.vertex.code.add(a.H`float calculateLinearDepth(vec2 nearFar,float z) {
return (-z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)}function u(e,t){const{vertex:r}=e;switch(t.output){case n.V.Color:if(t.receiveShadows)return s(e),void r.code.add(a.H`void forwardLinearDepth() { linearDepth = gl_Position.w; }`);break;case n.V.Depth:case n.V.Shadow:case n.V.ShadowHighlight:case n.V.ShadowExcludeHighlight:return e.include(i.em,t),s(e),l(e),c(e),void r.code.add(a.H`void forwardLinearDepth() {
linearDepth = calculateLinearDepth(nearFar, vPosition_view.z);
}`)}r.code.add(a.H`void forwardLinearDepth() {}`)}},15508:function(e,t,r){r.d(t,{M:function(){return i}});var n=r(80545);function i(e){e.vertex.code.add(n.H`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}},48812:function(e,t,r){r.d(t,{c:function(){return o}});var n=r(80545),i=r(6360);function o(e,t=!0){e.attributes.add(i.r.POSITION,"vec2"),t&&e.varyings.add("uv","vec2"),e.vertex.code.add(n.H`
    void main(void) {
      gl_Position = vec4(position, 0.0, 1.0);
      ${t?n.H`uv = position * 0.5 + vec2(0.5);`:""}
    }
  `)}},40443:function(e,t,r){var n;r.d(t,{V:function(){return n}}),function(e){e[e.Color=0]="Color",e[e.Depth=1]="Depth",e[e.Normal=2]="Normal",e[e.Shadow=3]="Shadow",e[e.ShadowHighlight=4]="ShadowHighlight",e[e.ShadowExcludeHighlight=5]="ShadowExcludeHighlight",e[e.Highlight=6]="Highlight",e[e.Alpha=7]="Alpha",e[e.ObjectAndLayerIdColor=8]="ObjectAndLayerIdColor",e[e.COUNT=9]="COUNT"}(n||(n={}))},50859:function(e,t,r){r.d(t,{HQ:function(){return c}});var n=r(90183),i=r(26671),o=r(67886),a=r(456),s=r(48186),l=(r(24923),r(80545));l.Y;function c(e,t){u(e,t,new s.W("slicePlaneOrigin",((e,r)=>m(t,e,r))),new s.W("slicePlaneBasis1",((e,r)=>p(t,e,r,r.slicePlane?.basis1))),new s.W("slicePlaneBasis2",((e,r)=>p(t,e,r,r.slicePlane?.basis2))))}function u(e,t,...r){if(!t.hasSlicePlane){const r=l.H`#define rejectBySlice(_pos_) false
#define discardBySlice(_pos_) {}
#define highlightSlice(_color_, _pos_) (_color_)`;return t.hasSliceInVertexProgram&&e.vertex.code.add(r),void e.fragment.code.add(r)}t.hasSliceInVertexProgram&&e.vertex.uniforms.add(...r),e.fragment.uniforms.add(...r);const n=l.H`struct SliceFactors {
float front;
float side0;
float side1;
float side2;
float side3;
};
SliceFactors calculateSliceFactors(vec3 pos) {
vec3 rel = pos - slicePlaneOrigin;
vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);
float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);
float basis1Dot = dot(slicePlaneBasis1, rel);
float basis2Dot = dot(slicePlaneBasis2, rel);
return SliceFactors(
dot(slicePlaneNormal, pos) + slicePlaneW,
-basis1Dot - basis1Len2,
basis1Dot - basis1Len2,
-basis2Dot - basis2Len2,
basis2Dot - basis2Len2
);
}
bool sliceByFactors(SliceFactors factors) {
return factors.front < 0.0
&& factors.side0 < 0.0
&& factors.side1 < 0.0
&& factors.side2 < 0.0
&& factors.side3 < 0.0;
}
bool sliceEnabled() {
return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
}
bool sliceByPlane(vec3 pos) {
return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
}
#define rejectBySlice(_pos_) sliceByPlane(_pos_)
#define discardBySlice(_pos_) { if (sliceByPlane(_pos_)) discard; }`,i=l.H`vec4 applySliceHighlight(vec4 color, vec3 pos) {
SliceFactors factors = calculateSliceFactors(pos);
const float HIGHLIGHT_WIDTH = 1.0;
const vec4 HIGHLIGHT_COLOR = vec4(0.0, 0.0, 0.0, 0.3);
factors.front /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.front);
factors.side0 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side0);
factors.side1 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side1);
factors.side2 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side2);
factors.side3 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side3);
if (sliceByFactors(factors)) {
return color;
}
float highlightFactor = (1.0 - step(0.5, factors.front))
* (1.0 - step(0.5, factors.side0))
* (1.0 - step(0.5, factors.side1))
* (1.0 - step(0.5, factors.side2))
* (1.0 - step(0.5, factors.side3));
return mix(color, vec4(HIGHLIGHT_COLOR.rgb, color.a), highlightFactor * HIGHLIGHT_COLOR.a);
}`,o=t.hasSliceHighlight?l.H`
        ${i}
        #define highlightSlice(_color_, _pos_) (sliceEnabled() ? applySliceHighlight(_color_, _pos_) : (_color_))
      `:l.H`#define highlightSlice(_color_, _pos_) (_color_)`;t.hasSliceInVertexProgram&&e.vertex.code.add(n),e.fragment.code.add(n),e.fragment.code.add(o)}function d(e,t,r){return e.instancedDoublePrecision?(0,o.s)(v,r.camera.viewInverseTransposeMatrix[3],r.camera.viewInverseTransposeMatrix[7],r.camera.viewInverseTransposeMatrix[11]):t.slicePlaneLocalOrigin}function h(e,t){return null!=e?(0,o.b)(g,t.origin,e):t.origin}function f(e,t,r){return e.hasSliceTranslatedView?null!=t?(0,n.w)(x,r.camera.viewMatrix,t):r.camera.viewMatrix:null}function m(e,t,r){if(null==r.slicePlane)return a.Z;const n=d(e,t,r),i=h(n,r.slicePlane),s=f(e,n,r);return null!=s?(0,o.m)(g,i,s):i}function p(e,t,r,n){if(null==n||null==r.slicePlane)return a.Z;const i=d(e,t,r),s=h(i,r.slicePlane),l=f(e,i,r);return null!=l?((0,o.a)(_,n,s),(0,o.m)(g,s,l),(0,o.m)(_,_,l),(0,o.b)(_,_,g)):n}const v=(0,a.c)(),g=(0,a.c)(),_=(0,a.c)(),x=(0,i.c)()},70953:function(e,t,r){r.d(t,{d:function(){return o}});var n=r(78306),i=r(80545);function o(e){(0,n.i$)(e),e.vertex.code.add(i.H`vec4 transformPositionWithDepth(mat4 proj, mat4 view, vec3 pos, vec2 nearFar, out float depth) {
vec4 eye = view * vec4(pos, 1.0);
depth = calculateLinearDepth(nearFar,eye.z);
return proj * eye;
}`),e.vertex.code.add(i.H`vec4 transformPosition(mat4 proj, mat4 view, vec3 pos) {
return proj * (view * vec4(pos, 1.0));
}`)}},12195:function(e,t,r){r.d(t,{B:function(){return p}});var n=r(71457),i=r(67886),o=r(456),a=r(40443),s=r(52061),l=r(35525),c=r(48186),u=r(80545),d=r(83853),h=r(6360),f=r(10645);class m extends d.K{constructor(){super(...arguments),this.instancedDoublePrecision=!1}}function p(e,t){t.instanced&&t.instancedDoublePrecision&&(e.attributes.add(h.r.MODELORIGINHI,"vec3"),e.attributes.add(h.r.MODELORIGINLO,"vec3"),e.attributes.add(h.r.MODEL,"mat3"),e.attributes.add(h.r.MODELNORMAL,"mat3"));const r=e.vertex;t.instancedDoublePrecision&&(r.include(s.u,t),r.uniforms.add(new c.W("viewOriginHi",((e,t)=>(0,f.Zo)((0,i.s)(v,t.camera.viewInverseTransposeMatrix[3],t.camera.viewInverseTransposeMatrix[7],t.camera.viewInverseTransposeMatrix[11]),v))),new c.W("viewOriginLo",((e,t)=>(0,f.jA)((0,i.s)(v,t.camera.viewInverseTransposeMatrix[3],t.camera.viewInverseTransposeMatrix[7],t.camera.viewInverseTransposeMatrix[11]),v))))),r.code.add(u.H`
    vec3 calculateVPos() {
      ${t.instancedDoublePrecision?"return model * localPosition().xyz;":"return localPosition().xyz;"}
    }
    `),r.code.add(u.H`
    vec3 subtractOrigin(vec3 _pos) {
      ${t.instancedDoublePrecision?u.H`
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -modelOriginHi, -modelOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),r.code.add(u.H`
    vec3 dpNormal(vec4 _normal) {
      ${t.instancedDoublePrecision?"return normalize(modelNormal * _normal.xyz);":"return normalize(_normal.xyz);"}
    }
    `),t.output===a.V.Normal&&((0,l.S7)(r),r.code.add(u.H`
    vec3 dpNormalView(vec4 _normal) {
      ${t.instancedDoublePrecision?"return normalize((viewNormal * vec4(modelNormal * _normal.xyz, 1.0)).xyz);":"return normalize((viewNormal * _normal).xyz);"}
    }
    `)),t.hasVertexTangents&&r.code.add(u.H`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${t.instancedDoublePrecision?"return vec4(modelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}

    }
    `)}(0,n._)([(0,d.W)()],m.prototype,"instancedDoublePrecision",void 0);const v=(0,o.c)()},96524:function(e,t,r){r.d(t,{W:function(){return n},Y:function(){return s}});var n,i=r(25214),o=r(80545),a=r(6360);function s(e,t){switch(t.normalType){case n.Compressed:e.attributes.add(a.r.NORMALCOMPRESSED,"vec2"),e.vertex.code.add(o.H`vec3 normalModel() {
float z = 1.0 - abs(normalCompressed.x) - abs(normalCompressed.y);
return vec3(normalCompressed + sign(normalCompressed) * min(z, 0.0), z);
}`);break;case n.Attribute:e.attributes.add(a.r.NORMAL,"vec3"),e.vertex.code.add(o.H`vec3 normalModel() {
return normal;
}`);break;case n.ScreenDerivative:e.fragment.code.add(o.H`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`);break;default:(0,i.Xb)(t.normalType);case n.COUNT:case n.Ground:}}!function(e){e[e.Attribute=0]="Attribute",e[e.Compressed=1]="Compressed",e[e.Ground=2]="Ground",e[e.ScreenDerivative=3]="ScreenDerivative",e[e.COUNT=4]="COUNT"}(n||(n={}))},74520:function(e,t,r){r.d(t,{I:function(){return o}});var n=r(80545),i=r(6360);function o(e){e.attributes.add(i.r.POSITION,"vec3"),e.vertex.code.add(n.H`vec3 positionModel() { return position; }`)}},35941:function(e,t,r){r.d(t,{K:function(){return c}});var n=r(36268),i=r(80545);function o(e){e.vertex.code.add(i.H`
    vec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {
      float symbolAlpha = 0.0;

      const float maxTint = 85.0;
      const float maxReplace = 170.0;
      const float scaleAlpha = 3.0;

      if (symbolColor.a > maxReplace) {
        colorMixMode = ${i.H.int(n.k5.Multiply)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxReplace);
      } else if (symbolColor.a > maxTint) {
        colorMixMode = ${i.H.int(n.k5.Replace)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxTint);
      } else if (symbolColor.a > 0.0) {
        colorMixMode = ${i.H.int(n.k5.Tint)};
        symbolAlpha = scaleAlpha * symbolColor.a;
      } else {
        colorMixMode = ${i.H.int(n.k5.Multiply)};
        symbolAlpha = 0.0;
      }

      return vec4(symbolColor.r, symbolColor.g, symbolColor.b, symbolAlpha);
    }
  `)}var a=r(14376),s=r(6360),l=r(78087);function c(e,t){t.hasSymbolColors?(e.include(o),e.attributes.add(s.r.SYMBOLCOLOR,"vec4"),e.varyings.add("colorMixMode","mediump float"),e.vertex.code.add(i.H`int symbolColorMixMode;
vec4 getSymbolColor() {
return decodeSymbolColor(symbolColor, symbolColorMixMode) * 0.003921568627451;
}
void forwardColorMixMode() {
colorMixMode = float(symbolColorMixMode) + 0.5;
}`)):(e.fragment.uniforms.add(new a.c("colorMixMode",(e=>l.Um[e.colorMixMode]))),e.vertex.code.add(i.H`vec4 getSymbolColor() { return vec4(1.0); }
void forwardColorMixMode() {}`))}},8982:function(e,t,r){r.d(t,{U:function(){return s},q:function(){return n}});var n,i=r(25214),o=r(80545),a=r(6360);function s(e,t){switch(t.textureCoordinateType){case n.Default:return e.attributes.add(a.r.UV0,"vec2"),e.varyings.add("vuv0","vec2"),void e.vertex.code.add(o.H`void forwardTextureCoordinates() {
vuv0 = uv0;
}`);case n.Compressed:return e.attributes.add(a.r.UV0,"vec2"),e.varyings.add("vuv0","vec2"),void e.vertex.code.add(o.H`vec2 getUV0() {
return uv0 / 16384.0;
}
void forwardTextureCoordinates() {
vuv0 = getUV0();
}`);case n.Atlas:return e.attributes.add(a.r.UV0,"vec2"),e.varyings.add("vuv0","vec2"),e.attributes.add(a.r.UVREGION,"vec4"),e.varyings.add("vuvRegion","vec4"),void e.vertex.code.add(o.H`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`);default:(0,i.Xb)(t.textureCoordinateType);case n.None:return void e.vertex.code.add(o.H`void forwardTextureCoordinates() {}`);case n.COUNT:return}}!function(e){e[e.None=0]="None",e[e.Default=1]="Default",e[e.Atlas=2]="Atlas",e[e.Compressed=3]="Compressed",e[e.COUNT=4]="COUNT"}(n||(n={}))},7304:function(e,t,r){r.d(t,{c:function(){return o}});var n=r(80545),i=r(6360);function o(e,t){t.hasVertexColors?(e.attributes.add(i.r.COLOR,"vec4"),e.varyings.add("vColor","vec4"),e.vertex.code.add(n.H`void forwardVertexColor() { vColor = color; }`),e.vertex.code.add(n.H`void forwardNormalizedVertexColor() { vColor = color * 0.003921568627451; }`)):e.vertex.code.add(n.H`void forwardVertexColor() {}
void forwardNormalizedVertexColor() {}`)}},94836:function(e,t,r){r.d(t,{Mh:function(){return d},Zo:function(){return h},gy:function(){return f}});var n=r(25214),i=r(37072),o=r(18439),a=r(96524),s=r(68196),l=r(80545),c=r(94125),u=r(97944);function d(e,t){switch(t.normalType){case a.W.Attribute:case a.W.Compressed:e.include(a.Y,t),e.varyings.add("vNormalWorld","vec3"),e.varyings.add("vNormalView","vec3"),e.vertex.uniforms.add(new c.h("transformNormalGlobalFromModel",(e=>e.transformNormalGlobalFromModel)),new u.k("transformNormalViewFromGlobal",(e=>e.transformNormalViewFromGlobal))),e.vertex.code.add(l.H`void forwardNormal() {
vNormalWorld = transformNormalGlobalFromModel * normalModel();
vNormalView = transformNormalViewFromGlobal * vNormalWorld;
}`);break;case a.W.Ground:e.include(s.em,t),e.varyings.add("vNormalWorld","vec3"),e.vertex.code.add(l.H`
        void forwardNormal() {
          vNormalWorld = ${t.spherical?l.H`normalize(vPositionWorldCameraRelative);`:l.H`vec3(0.0, 0.0, 1.0);`}
        }
        `);break;case a.W.ScreenDerivative:e.vertex.code.add(l.H`void forwardNormal() {}`);break;default:(0,n.Xb)(t.normalType);case a.W.COUNT:}}class h extends s.dO{constructor(){super(...arguments),this.transformNormalViewFromGlobal=(0,i.c)()}}class f extends s.EM{constructor(){super(...arguments),this.transformNormalGlobalFromModel=(0,i.c)(),this.toMapSpace=(0,o.c)()}}},68196:function(e,t,r){r.d(t,{EM:function(){return v},dO:function(){return p},em:function(){return m}});var n=r(37072),i=r(26671),o=r(456),a=r(74520),s=r(52061),l=r(48186),c=r(24923),u=r(80545),d=r(94125),h=r(97944),f=r(40275);function m(e,t){e.include(a.I);const r=e.vertex;r.include(s.u,t),e.varyings.add("vPositionWorldCameraRelative","vec3"),e.varyings.add("vPosition_view","vec3"),r.uniforms.add(new c.t("transformWorldFromViewTH",(e=>e.transformWorldFromViewTH)),new c.t("transformWorldFromViewTL",(e=>e.transformWorldFromViewTL)),new h.k("transformViewFromCameraRelativeRS",(e=>e.transformViewFromCameraRelativeRS)),new f.X("transformProjFromView",(e=>e.transformProjFromView)),new d.h("transformWorldFromModelRS",(e=>e.transformWorldFromModelRS)),new l.W("transformWorldFromModelTH",(e=>e.transformWorldFromModelTH)),new l.W("transformWorldFromModelTL",(e=>e.transformWorldFromModelTL))),r.code.add(u.H`vec3 positionWorldCameraRelative() {
vec3 rotatedModelPosition = transformWorldFromModelRS * positionModel();
vec3 transform_CameraRelativeFromModel = dpAdd(
transformWorldFromModelTL,
transformWorldFromModelTH,
-transformWorldFromViewTL,
-transformWorldFromViewTH
);
return transform_CameraRelativeFromModel + rotatedModelPosition;
}`),r.code.add(u.H`
    void forwardPosition(float fOffset) {
      vPositionWorldCameraRelative = positionWorldCameraRelative();
      if (fOffset != 0.0) {
        vPositionWorldCameraRelative += fOffset * ${t.spherical?u.H`normalize(transformWorldFromViewTL + vPositionWorldCameraRelative)`:u.H`vec3(0.0, 0.0, 1.0)`};
      }

      vPosition_view = transformViewFromCameraRelativeRS * vPositionWorldCameraRelative;
      gl_Position = transformProjFromView * vec4(vPosition_view, 1.0);
    }
  `),e.fragment.uniforms.add(new c.t("transformWorldFromViewTL",(e=>e.transformWorldFromViewTL))),r.code.add(u.H`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`),e.fragment.code.add(u.H`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`)}class p extends u.Y{constructor(){super(...arguments),this.transformWorldFromViewTH=(0,o.c)(),this.transformWorldFromViewTL=(0,o.c)(),this.transformViewFromCameraRelativeRS=(0,n.c)(),this.transformProjFromView=(0,i.c)()}}class v extends u.Y{constructor(){super(...arguments),this.transformWorldFromModelRS=(0,n.c)(),this.transformWorldFromModelTH=(0,o.c)(),this.transformWorldFromModelTL=(0,o.c)()}}},82886:function(e,t,r){r.d(t,{r:function(){return s}});var n=r(25214),i=r(8982),o=r(80545);function a(e){e.fragment.code.add(o.H`vec4 textureAtlasLookup(sampler2D tex, vec2 textureCoordinates, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;
float maxdUV = 0.125;
vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
return textureGrad(tex, uvAtlas, dUVdx, dUVdy);
}`)}function s(e,t){switch(e.include(i.U,t),t.textureCoordinateType){case i.q.Default:case i.q.Compressed:return void e.fragment.code.add(o.H`vec4 textureLookup(sampler2D tex, vec2 uv) {
return texture(tex, uv);
}`);case i.q.Atlas:return e.include(a),void e.fragment.code.add(o.H`vec4 textureLookup(sampler2D tex, vec2 uv) {
return textureAtlasLookup(tex, uv, vuvRegion);
}`);default:(0,n.Xb)(t.textureCoordinateType);case i.q.None:case i.q.COUNT:return}}},49256:function(e,t,r){r.d(t,{G:function(){return h}});var n=r(22095),i=r(18439),o=r(4128),a=r(80545);function s(e){e.vertex.code.add(a.H`float screenSizePerspectiveMinSize(float size, vec4 factor) {
float nonZeroSize = 1.0 - step(size, 0.0);
return (
factor.z * (
1.0 +
nonZeroSize *
2.0 * factor.w / (
size + (1.0 - nonZeroSize)
)
)
);
}`),e.vertex.code.add(a.H`float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {
return absCosAngle * absCosAngle * absCosAngle;
}`),e.vertex.code.add(a.H`vec4 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec4 params) {
return vec4(
min(params.x / (distanceToCamera - params.y), 1.0),
screenSizePerspectiveViewAngleDependentFactor(absCosAngle),
params.z,
params.w
);
}`),e.vertex.code.add(a.H`float applyScreenSizePerspectiveScaleFactorFloat(float size, vec4 factor) {
return max(mix(size * factor.x, size, factor.y), screenSizePerspectiveMinSize(size, factor));
}`),e.vertex.code.add(a.H`float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec4 params) {
return applyScreenSizePerspectiveScaleFactorFloat(
size,
screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)
);
}`),e.vertex.code.add(a.H`vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec4 factor) {
return mix(size * clamp(factor.x, screenSizePerspectiveMinSize(size.y, factor) / max(1e-5, size.y), 1.0), size, factor.y);
}`),e.vertex.code.add(a.H`vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec4 params) {
return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));
}`)}function l(e){e.uniforms.add(new o.E("screenSizePerspectiveAlignment",(e=>c(e.screenSizePerspectiveAlignment||e.screenSizePerspective))))}function c(e){return(0,n.s)(u,e.parameters.divisor,e.parameters.offset,e.parameters.minPixelSize,e.paddingPixelsOverride)}const u=(0,i.c)();var d=r(35525);function h(e,t){const r=e.vertex;t.hasVerticalOffset?(m(r),t.hasScreenSizePerspective&&(e.include(s),l(r),(0,d.yu)(e.vertex,t)),r.code.add(a.H`
      vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
        ${t.spherical?a.H`vec3 worldNormal = normalize(worldPos + localOrigin);`:a.H`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
        ${t.hasScreenSizePerspective?a.H`
            float cosAngle = dot(worldNormal, normalize(worldPos - cameraPosition));
            float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:a.H`
            float verticalOffsetScreenHeight = verticalOffset.x;`}
        // Screen sized offset in world space, used for example for line callouts
        float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
        return worldNormal * worldOffset;
      }

      vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        return worldPos + calculateVerticalOffset(worldPos, localOrigin);
      }
    `)):r.code.add(a.H`vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }`)}const f=(0,i.c)();function m(e){e.uniforms.add(new o.E("verticalOffset",((e,t)=>{const{minWorldLength:r,maxWorldLength:i,screenLength:o}=e.verticalOffset,a=Math.tan(.5*t.camera.fovY)/(.5*t.camera.fullViewport[3]),s=t.camera.pixelRatio||1;return(0,n.s)(f,o*s,a,r,i)})))}},62001:function(e,t,r){r.d(t,{E:function(){return M}});var n=r(13030),i=r(37072),o=r(26671),a=r(78306),s=r(40443),l=r(50859),c=r(70953),u=r(96524),d=r(80545),h=r(6360);function f(e,t){const r=t.output===s.V.ObjectAndLayerIdColor,n=t.objectAndLayerIdColorInstanced;r&&(e.varyings.add("objectAndLayerIdColorVarying","vec4"),n?e.attributes.add(h.r.INSTANCEOBJECTANDLAYERIDCOLOR,"vec4"):e.attributes.add(h.r.OBJECTANDLAYERIDCOLOR,"vec4")),e.vertex.code.add(d.H`
     void forwardObjectAndLayerIdColor() {
      ${r?n?d.H`objectAndLayerIdColorVarying = instanceObjectAndLayerIdColor * 0.003921568627451;`:d.H`objectAndLayerIdColorVarying = objectAndLayerIdColor * 0.003921568627451;`:d.H``} }`),e.fragment.code.add(d.H`
      void outputObjectAndLayerIdColor() {
        ${r?d.H`fragColor = objectAndLayerIdColorVarying;`:d.H``} }`)}var m=r(8982),p=r(94836),v=r(82095);function g(e,t){switch(e.fragment.include(v.W),t.output){case s.V.Shadow:case s.V.ShadowHighlight:case s.V.ShadowExcludeHighlight:e.fragment.code.add(d.H`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 20.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
float result = depth + SLOPE_SCALE * m + BIAS;
return clamp(result, .0, .999999);
}
void outputDepth(float _linearDepth) {
fragColor = float2rgba(_calculateFragDepth(_linearDepth));
}`);break;case s.V.Depth:e.fragment.code.add(d.H`void outputDepth(float _linearDepth) {
fragColor = float2rgba(_linearDepth);
}`)}}var _=r(18439),x=r(47613);const T=(0,_.f)(1,1,0,1),b=(0,_.f)(1,0,1,1);function A(e){e.fragment.uniforms.add(new x.N("depthTexture",((e,t)=>t.highlightDepthTexture))),e.fragment.constants.add("occludedHighlightFlag","vec4",T).add("unoccludedHighlightFlag","vec4",b),e.fragment.code.add(d.H`void outputHighlight() {
float sceneDepth = float(texelFetch(depthTexture, ivec2(gl_FragCoord.xy), 0).x);
if (gl_FragCoord.z > sceneDepth + 5e-7) {
fragColor = occludedHighlightFlag;
} else {
fragColor = unoccludedHighlightFlag;
}
}`)}var S=r(14795),y=r(25217),O=r(35525),C=r(97944),E=r(40275),w=r(78964);function M(e,t){const{vertex:r,fragment:h}=e,v=t.hasModelTransformation;if(v){const e=(0,i.c)();r.uniforms.add(new E.X("model",(e=>e.modelTransformation??o.I))),r.uniforms.add(new C.k("normalTransform",(t=>((0,n.b)(e,t.modelTransformation??o.I),e))))}const _=t.hasColorTexture&&t.alphaDiscardMode!==w.sf.Opaque;switch(t.output){case s.V.Depth:case s.V.Shadow:case s.V.ShadowHighlight:case s.V.ShadowExcludeHighlight:case s.V.ObjectAndLayerIdColor:(0,O.NB)(r,t),e.include(c.d,t),e.include(m.U,t),e.include(S.A,t),e.include(g,t),e.include(l.HQ,t),e.include(f,t),(0,a.xJ)(e),e.varyings.add("depth","float"),_&&h.uniforms.add(new x.N("tex",(e=>e.texture))),r.code.add(d.H`
          void main(void) {
            vpos = calculateVPos();
            ${v?"vpos = (model * vec4(vpos, 1.0)).xyz;":""}
            vpos = subtractOrigin(vpos);
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
            forwardTextureCoordinates();
            forwardObjectAndLayerIdColor();
          }
        `),e.include(y.S,t),h.code.add(d.H`
          void main(void) {
            discardBySlice(vpos);
            ${_?d.H`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?d.H`colorUV`:d.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            ${t.output===s.V.ObjectAndLayerIdColor?d.H`outputObjectAndLayerIdColor();`:d.H`outputDepth(depth);`}
          }
        `);break;case s.V.Normal:{(0,O.NB)(r,t),e.include(c.d,t),e.include(u.Y,t),e.include(p.Mh,t),e.include(m.U,t),e.include(S.A,t),_&&h.uniforms.add(new x.N("tex",(e=>e.texture))),t.normalType===u.W.ScreenDerivative&&e.varyings.add("vPositionView","vec3");const n=t.normalType===u.W.Attribute||t.normalType===u.W.Compressed;r.code.add(d.H`
          void main(void) {
            vpos = calculateVPos();
            ${v?"vpos = (model * vec4(vpos, 1.0)).xyz;":""}

            ${n?d.H`vNormalWorld = ${v?"normalize(normalTransform * dpNormal(vvLocalNormal(normalModel())))":"dpNormalView(vvLocalNormal(normalModel()))"};`:d.H`
                  // Get vertex position in camera space for screen-space derivative normals
                  vPositionView = (view * vec4(vpos, 1.0)).xyz;
                `}
            vpos = subtractOrigin(vpos);
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            forwardTextureCoordinates();
          }
        `),e.include(l.HQ,t),e.include(y.S,t),h.code.add(d.H`
          void main() {
            discardBySlice(vpos);
            ${_?d.H`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?d.H`colorUV`:d.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}

            ${t.normalType===u.W.ScreenDerivative?d.H`vec3 normal = screenDerivativeNormal(vPositionView);`:d.H`
                  vec3 normal = normalize(vNormalWorld);
                  if (gl_FrontFacing == false){
                    normal = -normal;
                  }`}
            fragColor = vec4(0.5 + 0.5 * normal, 1.0);
          }
        `);break}case s.V.Highlight:(0,O.NB)(r,t),e.include(c.d,t),e.include(m.U,t),e.include(S.A,t),_&&h.uniforms.add(new x.N("tex",(e=>e.texture))),r.code.add(d.H`
          void main(void) {
            vpos = calculateVPos();
            ${v?"vpos = (model * vec4(vpos, 1.0)).xyz;":""}
            vpos = subtractOrigin(vpos);
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            forwardTextureCoordinates();
          }
        `),e.include(l.HQ,t),e.include(y.S,t),e.include(A,t),h.code.add(d.H`
          void main() {
            discardBySlice(vpos);
            ${_?d.H`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?d.H`colorUV`:d.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            outputHighlight();
          }
        `)}}},541:function(e,t,r){r.d(t,{D:function(){return o}});var n=r(82095),i=r(80545);function o(e){e.include(n.W),e.code.add(i.H`float linearDepthFromFloat(float depth, vec2 nearFar) {
return -(depth * (nearFar[1] - nearFar[0]) + nearFar[0]);
}
float linearDepthFromTexture(sampler2D depthTex, vec2 uv, vec2 nearFar) {
return linearDepthFromFloat(rgba2float(texture(depthTex, uv)), nearFar);
}`)}},72931:function(e,t,r){r.d(t,{W:function(){return d}});var n=r(8982),i=r(82886),o=r(95190),a=r(80545),s=r(47076),l=r(47613),c=r(52867),u=r(6360);function d(e,t){const r=e.fragment;t.hasVertexTangents?(e.attributes.add(u.r.TANGENT,"vec4"),e.varyings.add("vTangent","vec4"),t.doubleSidedMode===o.W.WindingOrder?r.code.add(a.H`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):r.code.add(a.H`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):r.code.add(a.H`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),t.textureCoordinateType!==n.q.None&&(e.include(i.r,t),r.uniforms.add(t.pbrTextureBindType===c.c.Pass?new l.N("normalTexture",(e=>e.textureNormal)):new s.o("normalTexture",(e=>e.textureNormal))),r.code.add(a.H`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;
return tangentSpace * rawNormal;
}`))}},12815:function(e,t,r){r.d(t,{n:function(){return _}});var n=r(80545),i=r(47613),o=(r(16573),r(78100),r(77936),r(37467),r(44732),r(79577),r(64979),r(79908),r(28589),r(37985)),a=r(6360),s=r(73719),l=r(28018);new l._(a.r.POSITION,3,s.pe.FLOAT,0,12),new l._(a.r.POSITION,3,s.pe.FLOAT,0,20),new l._(a.r.UV0,2,s.pe.FLOAT,12,20),new l._(a.r.POSITION,3,s.pe.FLOAT,0,32),new l._(a.r.NORMAL,3,s.pe.FLOAT,12,32),new l._(a.r.UV0,2,s.pe.FLOAT,24,32),new l._(a.r.POSITION,3,s.pe.FLOAT,0,16),new l._(a.r.COLOR,4,s.pe.UNSIGNED_BYTE,12,16),new l._(a.r.POSITION,2,s.pe.FLOAT,0,8),new l._(a.r.POSITION,2,s.pe.FLOAT,0,16),new l._(a.r.UV0,2,s.pe.FLOAT,8,16);r(79925);r(64632),r(69635),r(54703);var c=r(28160),u=r(75887),d=r(8114),h=r(56930),f=r(46896);class m extends u.w{initializeProgram(e){return new d.B(e.rctx,m.shader.get().build(),o.D)}initializePipeline(){return(0,f.Ey)({colorWrite:f.wE})}}m.shader=new c.$(h.S,(()=>r.e(9068).then(r.bind(r,99068))));var p=r(88545);class v extends u.w{initializeProgram(e){return new d.B(e.rctx,v.shader.get().build(),o.D)}initializePipeline(){return(0,f.Ey)({colorWrite:f.wE})}}v.shader=new c.$(p.S,(()=>r.e(6595).then(r.bind(r,36595))));r(15329);n.Y;n.Y;r(99513),r(1257);const g=2;function _(e,t){const r=e.fragment;t.receiveAmbientOcclusion?(r.uniforms.add(new i.N("ssaoTex",((e,t)=>t.ssaoHelper.colorTexture))),r.constants.add("blurSizePixelsInverse","float",1/g),r.code.add(n.H`float evaluateAmbientOcclusionInverse() {
vec2 ssaoTextureSizeInverse = 1.0 / vec2(textureSize(ssaoTex, 0));
return texture(ssaoTex, gl_FragCoord.xy * blurSizePixelsInverse * ssaoTextureSizeInverse).a;
}
float evaluateAmbientOcclusion() {
return 1.0 - evaluateAmbientOcclusionInverse();
}`)):r.code.add(n.H`float evaluateAmbientOcclusionInverse() { return 1.0; }
float evaluateAmbientOcclusion() { return 0.0; }`)}},71448:function(e,t,r){r.d(t,{kA:function(){return C},a8:function(){return y},eU:function(){return O}});var n=r(25214),i=r(67886),o=r(456),a=r(22095),s=r(18439),l=r(6065),c=r(24923),u=r(4128),d=r(80545);function h(e,t){const r=e.fragment,n=void 0!==t.lightingSphericalHarmonicsOrder?t.lightingSphericalHarmonicsOrder:2;0===n?(r.uniforms.add(new c.t("lightingAmbientSH0",((e,t)=>(0,i.s)(f,t.lighting.sh.r[0],t.lighting.sh.g[0],t.lighting.sh.b[0])))),r.code.add(d.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):1===n?(r.uniforms.add(new u.E("lightingAmbientSH_R",((e,t)=>(0,a.s)(m,t.lighting.sh.r[0],t.lighting.sh.r[1],t.lighting.sh.r[2],t.lighting.sh.r[3]))),new u.E("lightingAmbientSH_G",((e,t)=>(0,a.s)(m,t.lighting.sh.g[0],t.lighting.sh.g[1],t.lighting.sh.g[2],t.lighting.sh.g[3]))),new u.E("lightingAmbientSH_B",((e,t)=>(0,a.s)(m,t.lighting.sh.b[0],t.lighting.sh.b[1],t.lighting.sh.b[2],t.lighting.sh.b[3])))),r.code.add(d.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):2===n&&(r.uniforms.add(new c.t("lightingAmbientSH0",((e,t)=>(0,i.s)(f,t.lighting.sh.r[0],t.lighting.sh.g[0],t.lighting.sh.b[0]))),new u.E("lightingAmbientSH_R1",((e,t)=>(0,a.s)(m,t.lighting.sh.r[1],t.lighting.sh.r[2],t.lighting.sh.r[3],t.lighting.sh.r[4]))),new u.E("lightingAmbientSH_G1",((e,t)=>(0,a.s)(m,t.lighting.sh.g[1],t.lighting.sh.g[2],t.lighting.sh.g[3],t.lighting.sh.g[4]))),new u.E("lightingAmbientSH_B1",((e,t)=>(0,a.s)(m,t.lighting.sh.b[1],t.lighting.sh.b[2],t.lighting.sh.b[3],t.lighting.sh.b[4]))),new u.E("lightingAmbientSH_R2",((e,t)=>(0,a.s)(m,t.lighting.sh.r[5],t.lighting.sh.r[6],t.lighting.sh.r[7],t.lighting.sh.r[8]))),new u.E("lightingAmbientSH_G2",((e,t)=>(0,a.s)(m,t.lighting.sh.g[5],t.lighting.sh.g[6],t.lighting.sh.g[7],t.lighting.sh.g[8]))),new u.E("lightingAmbientSH_B2",((e,t)=>(0,a.s)(m,t.lighting.sh.b[5],t.lighting.sh.b[6],t.lighting.sh.b[7],t.lighting.sh.b[8])))),r.code.add(d.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),t.pbrMode!==l.A9.Normal&&t.pbrMode!==l.A9.Schematic||r.code.add(d.H`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}const f=(0,o.c)(),m=(0,s.c)();var p=r(12815),v=r(75335),g=r(27424),_=r(6862),x=r(96889),T=r(52867);class b extends x.n{constructor(e,t){super(e,"bool",T.c.Pass,((r,n,i)=>r.setUniform1b(e,t(n,i))))}}var A=r(45804);r(26011);r(44114);(0,o.c)();const S=.4;(0,o.c)();function y(e){e.constants.add("ambientBoostFactor","float",S)}function O(e){e.uniforms.add(new A.m("lightingGlobalFactor",((e,t)=>t.lighting.globalFactor)))}function C(e,t){const r=e.fragment;switch(e.include(p.n,t),t.pbrMode!==l.A9.Disabled&&e.include(g.c,t),e.include(h,t),e.include(_.p),r.code.add(d.H`
    const float GAMMA_SRGB = 2.1;
    const float INV_GAMMA_SRGB = 0.4761904;
    ${t.pbrMode===l.A9.Disabled?"":"const vec3 GROUND_REFLECTANCE = vec3(0.2);"}
  `),y(r),O(r),(0,v.Gc)(r),r.code.add(d.H`
    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float vndl = dot(${t.spherical?d.H`normalize(vPosWorld)`:d.H`vec3(0.0, 0.0, 1.0)`}, mainLightDirection);
      return smoothstep(0.0, 1.0, clamp(vndl * 2.5, 0.0, 1.0));
    }
  `),(0,v.O4)(r),r.code.add(d.H`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * mainLightIntensity;
}`),t.pbrMode){case l.A9.Disabled:case l.A9.WaterOnIntegratedMesh:case l.A9.Water:e.include(v.qU),r.code.add(d.H`vec3 evaluateSceneLighting(vec3 normalWorld, vec3 albedo, float shadow, float ssao, vec3 additionalLight)
{
vec3 mainLighting = evaluateMainLighting(normalWorld, shadow);
vec3 ambientLighting = calculateAmbientIrradiance(normalWorld, ssao);
vec3 albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
vec3 totalLight = mainLighting + ambientLighting + additionalLight;
totalLight = min(totalLight, vec3(PI));
vec3 outColor = vec3((albedoLinear / PI) * totalLight);
return pow(outColor, vec3(INV_GAMMA_SRGB));
}`);break;case l.A9.Normal:case l.A9.Schematic:r.code.add(d.H`const float fillLightIntensity = 0.25;
const float horizonLightDiffusion = 0.4;
const float additionalAmbientIrradianceFactor = 0.02;
vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight, vec3 viewDir, vec3 normalGround, vec3 mrr, vec3 _emission, float additionalAmbientIrradiance)
{
vec3 viewDirection = -viewDir;
vec3 h = normalize(viewDirection + mainLightDirection);
PBRShadingInfo inputs;
inputs.NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
inputs.NdotV = clamp(abs(dot(normal, viewDirection)), 0.001, 1.0);
inputs.NdotH = clamp(dot(normal, h), 0.0, 1.0);
inputs.VdotH = clamp(dot(viewDirection, h), 0.0, 1.0);
inputs.NdotNG = clamp(dot(normal, normalGround), -1.0, 1.0);
vec3 reflectedView = normalize(reflect(viewDirection, normal));
inputs.RdotNG = clamp(dot(reflectedView, normalGround), -1.0, 1.0);
inputs.albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
inputs.ssao = ssao;
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);`),r.code.add(d.H`inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);`),t.useFillLights?r.uniforms.add(new b("hasFillLights",((e,t)=>t.enableFillLights))):r.constants.add("hasFillLights","bool",!1),r.code.add(d.H`vec3 ambientDir = vec3(5.0 * normalGround[1] - normalGround[0] * normalGround[2], - 5.0 * normalGround[0] - normalGround[2] * normalGround[1], normalGround[1] * normalGround[1] + normalGround[0] * normalGround[0]);
ambientDir = ambientDir != vec3(0.0)? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));
inputs.NdotAmbDir = hasFillLights ? abs(dot(normal, ambientDir)) : 1.0;
vec3 mainLightIrradianceComponent = inputs.NdotL * (1.0 - shadow) * mainLightIntensity;
vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * mainLightIntensity * fillLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(normal, ssao) + additionalLight;
inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
inputs.groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;`),r.uniforms.add(new A.m("lightingSpecularStrength",((e,t)=>t.lighting.mainLight.specularStrength)),new A.m("lightingEnvironmentStrength",((e,t)=>t.lighting.mainLight.environmentStrength))),r.code.add(d.H`vec3 horizonRingDir = inputs.RdotNG * normalGround - reflectedView;
vec3 horizonRingH = normalize(viewDirection + horizonRingDir);
inputs.NdotH_Horizon = dot(normal, horizonRingH);
vec3 mainLightRadianceComponent = lightingSpecularStrength * normalDistribution(inputs.NdotH, inputs.roughness) * mainLightIntensity * (1.0 - shadow);
vec3 horizonLightRadianceComponent = lightingEnvironmentStrength * normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * mainLightIntensity * fillLightIntensity;
vec3 ambientLightRadianceComponent = lightingEnvironmentStrength * calculateAmbientRadiance(ssao) + additionalLight;
inputs.skyRadianceToSurface = ambientLightRadianceComponent + mainLightRadianceComponent + horizonLightRadianceComponent;
inputs.groundRadianceToSurface = GROUND_REFLECTANCE * (ambientLightRadianceComponent + horizonLightRadianceComponent) + mainLightRadianceComponent;
inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + GROUND_REFLECTANCE[1]);`),r.code.add(d.H`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 emissionComponent = pow(_emission, vec3(GAMMA_SRGB));
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent + emissionComponent;
        ${t.pbrMode===l.A9.Schematic?d.H`vec3 outColor = pow(max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`:d.H`vec3 outColor = pow(blackLevelSoftCompression(outColorLinear, inputs), vec3(INV_GAMMA_SRGB));`}
        return outColor;
      }
    `);break;case l.A9.Terrain:case l.A9.TerrainWithWater:e.include(v.qU),r.code.add(d.H`const float roughnessTerrain = 0.5;
const float specularityTerrain = 0.5;
const vec3 fresnelReflectionTerrain = vec3(0.04);
vec3 evaluateTerrainLighting(vec3 n, vec3 c, float shadow, float ssao, vec3 al, vec3 vd, vec3 nup) {
vec3 viewDirection = -vd;
vec3 h = normalize(viewDirection + mainLightDirection);
float NdotL = clamp(dot(n, mainLightDirection), 0.001, 1.0);
float NdotV = clamp(abs(dot(n, viewDirection)), 0.001, 1.0);
float NdotH = clamp(dot(n, h), 0.0, 1.0);
float NdotNG = clamp(dot(n, nup), -1.0, 1.0);
vec3 albedoLinear = pow(c, vec3(GAMMA_SRGB));
float lightness = 0.3 * albedoLinear[0] + 0.5 * albedoLinear[1] + 0.2 * albedoLinear[2];
vec3 f0 = (0.85 * lightness + 0.15) * fresnelReflectionTerrain;
vec3 f90 =  vec3(clamp(dot(f0, vec3(50.0 * 0.33)), 0.0, 1.0));
vec3 mainLightIrradianceComponent = (1. - shadow) * NdotL * mainLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(n, ssao) + al;
vec3 ambientSky = ambientLightIrradianceComponent + mainLightIrradianceComponent;
vec3 indirectDiffuse = ((1.0 - NdotNG) * mainLightIrradianceComponent + (1.0 + NdotNG ) * ambientSky) * 0.5;
vec3 outDiffColor = albedoLinear * (1.0 - f0) * indirectDiffuse / PI;
vec3 mainLightRadianceComponent = normalDistribution(NdotH, roughnessTerrain) * mainLightIntensity;
vec2 dfg = prefilteredDFGAnalytical(roughnessTerrain, NdotV);
vec3 specularColor = f0 * dfg.x + f90 * dfg.y;
vec3 specularComponent = specularityTerrain * specularColor * mainLightRadianceComponent;
vec3 outColorLinear = outDiffColor + specularComponent;
vec3 outColor = pow(outColorLinear, vec3(INV_GAMMA_SRGB));
return outColor;
}`);break;default:(0,n.Xb)(t.pbrMode);case l.A9.COUNT:}}},75335:function(e,t,r){r.d(t,{Gc:function(){return o},O4:function(){return a},qU:function(){return s}});var n=r(24923),i=r(80545);function o(e){e.uniforms.add(new n.t("mainLightDirection",((e,t)=>t.lighting.mainLight.direction)))}function a(e){e.uniforms.add(new n.t("mainLightIntensity",((e,t)=>t.lighting.mainLight.intensity)))}function s(e){o(e.fragment),a(e.fragment),e.fragment.code.add(i.H`vec3 evaluateMainLighting(vec3 normal_global, float shadowing) {
float dotVal = clamp(dot(normal_global, mainLightDirection), 0.0, 1.0);
return mainLightIntensity * ((1.0 - shadowing) * dotVal);
}`)}},67235:function(e,t,r){r.d(t,{Q:function(){return s}});var n=r(541),i=r(13418),o=r(80545),a=r(47613);function s(e,t){t.hasMultipassTerrain&&(e.fragment.include(n.D),e.fragment.uniforms.add(new a.N("terrainDepthTexture",((e,t)=>t.multipassTerrain.linearDepthTexture))),e.fragment.uniforms.add(new i.G("nearFar",((e,t)=>t.camera.nearFar))),e.fragment.uniforms.add(new i.G("inverseViewport",((e,t)=>t.inverseViewport))),e.fragment.code.add(o.H`
    void terrainDepthTest(vec4 fragCoord, float fragmentDepth){
      float terrainDepth = linearDepthFromTexture(terrainDepthTexture, fragCoord.xy * inverseViewport, nearFar);
      if(fragmentDepth ${t.cullAboveGround?">":"<="} terrainDepth){
        discard;
      }
    }
  `))}},95190:function(e,t,r){r.d(t,{W:function(){return n},r:function(){return a}});var n,i=r(25214),o=r(80545);function a(e,t){const r=e.fragment;switch(r.code.add(o.H`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),t.doubleSidedMode){case n.None:r.code.add(o.H`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case n.View:r.code.add(o.H`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case n.WindingOrder:r.code.add(o.H`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:(0,i.Xb)(t.doubleSidedMode);case n.COUNT:}}!function(e){e[e.None=0]="None",e[e.View=1]="View",e[e.WindingOrder=2]="WindingOrder",e[e.COUNT=3]="COUNT"}(n||(n={}))},27424:function(e,t,r){r.d(t,{c:function(){return s}});var n=r(80545);function i(e){const t=e.fragment.code;t.add(n.H`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG)
{
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),t.add(n.H`float integratedRadiance(float cosTheta2, float roughness)
{
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),t.add(n.H`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness)
{
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}var o=r(6065),a=r(6862);function s(e,t){const r=e.fragment.code;e.include(a.p),t.pbrMode!==o.A9.Normal&&t.pbrMode!==o.A9.Schematic&&t.pbrMode!==o.A9.Terrain&&t.pbrMode!==o.A9.TerrainWithWater||(r.add(n.H`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),r.add(n.H`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`)),t.pbrMode!==o.A9.Normal&&t.pbrMode!==o.A9.Schematic||(e.include(i),r.add(n.H`struct PBRShadingInfo
{
float NdotL;
float NdotV;
float NdotH;
float VdotH;
float LdotH;
float NdotNG;
float RdotNG;
float NdotAmbDir;
float NdotH_Horizon;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
float averageAmbientRadiance;
float ssao;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`),r.add(n.H`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`),r.add(n.H`float gamutMapChanel(float x, vec2 p){
return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
}`),r.add(n.H`vec3 blackLevelSoftCompression(vec3 inColor, PBRShadingInfo inputs){
vec3 outColor;
vec2 p = vec2(0.02 * (inputs.averageAmbientRadiance), 0.0075 * (inputs.averageAmbientRadiance));
outColor.x = gamutMapChanel(inColor.x, p) ;
outColor.y = gamutMapChanel(inColor.y, p) ;
outColor.z = gamutMapChanel(inColor.z, p) ;
return outColor;
}`))}},6065:function(e,t,r){r.d(t,{A9:function(){return n},_Z:function(){return d}});var n,i=r(82886),o=r(48186),a=r(24923),s=r(80545),l=r(47076),c=r(47613),u=r(52867);r(12591);!function(e){e[e.Disabled=0]="Disabled",e[e.Normal=1]="Normal",e[e.Schematic=2]="Schematic",e[e.Water=3]="Water",e[e.WaterOnIntegratedMesh=4]="WaterOnIntegratedMesh",e[e.Terrain=5]="Terrain",e[e.TerrainWithWater=6]="TerrainWithWater",e[e.COUNT=7]="COUNT"}(n||(n={}));function d(e,t){const r=e.fragment,d=t.hasMetallicRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture;if(t.pbrMode===n.Normal&&d&&e.include(i.r,t),t.pbrMode!==n.Schematic)if(t.pbrMode!==n.Disabled){if(t.pbrMode===n.Normal){r.code.add(s.H`vec3 mrr;
vec3 emission;
float occlusion;`);const e=t.pbrTextureBindType;t.hasMetallicRoughnessTexture&&(r.uniforms.add(e===u.c.Pass?new c.N("texMetallicRoughness",(e=>e.textureMetallicRoughness)):new l.o("texMetallicRoughness",(e=>e.textureMetallicRoughness))),r.code.add(s.H`void applyMetallnessAndRoughness(vec2 uv) {
vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
mrr[0] *= metallicRoughness.b;
mrr[1] *= metallicRoughness.g;
}`)),t.hasEmissionTexture&&(r.uniforms.add(e===u.c.Pass?new c.N("texEmission",(e=>e.textureEmissive)):new l.o("texEmission",(e=>e.textureEmissive))),r.code.add(s.H`void applyEmission(vec2 uv) {
emission *= textureLookup(texEmission, uv).rgb;
}`)),t.hasOcclusionTexture?(r.uniforms.add(e===u.c.Pass?new c.N("texOcclusion",(e=>e.textureOcclusion)):new l.o("texOcclusion",(e=>e.textureOcclusion))),r.code.add(s.H`void applyOcclusion(vec2 uv) {
occlusion *= textureLookup(texOcclusion, uv).r;
}
float getBakedOcclusion() {
return occlusion;
}`)):r.code.add(s.H`float getBakedOcclusion() { return 1.0; }`),e===u.c.Pass?r.uniforms.add(new a.t("emissionFactor",(e=>e.emissiveFactor)),new a.t("mrrFactors",(e=>e.mrrFactors))):r.uniforms.add(new o.W("emissionFactor",(e=>e.emissiveFactor)),new o.W("mrrFactors",(e=>e.mrrFactors))),r.code.add(s.H`
    void applyPBRFactors() {
      mrr = mrrFactors;
      emission = emissionFactor;
      occlusion = 1.0;

      ${t.hasMetallicRoughnessTexture?s.H`applyMetallnessAndRoughness(${t.hasMetallicRoughnessTextureTransform?s.H`metallicRoughnessUV`:"vuv0"});`:""}

      ${t.hasEmissionTexture?s.H`applyEmission(${t.hasEmissiveTextureTransform?s.H`emissiveUV`:"vuv0"});`:""}

      ${t.hasOcclusionTexture?s.H`applyOcclusion(${t.hasOcclusionTextureTransform?s.H`occlusionUV`:"vuv0"});`:""}
    }
  `)}}else r.code.add(s.H`float getBakedOcclusion() { return 1.0; }`);else r.code.add(s.H`vec3 mrr = vec3(0.0, 0.6, 0.2);
vec3 emission = vec3(0.0);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`)}},6862:function(e,t,r){r.d(t,{p:function(){return i}});var n=r(80545);function i(e){e.vertex.code.add(n.H`const float PI = 3.141592653589793;`),e.fragment.code.add(n.H`const float PI = 3.141592653589793;
const float LIGHT_NORMALIZATION = 1.0 / PI;
const float INV_PI = 0.3183098861837907;
const float HALF_PI = 1.570796326794897;`)}},54335:function(e,t,r){r.d(t,{Bz:function(){return f},G:function(){return h}});r(26671),r(456);var n=r(82095),i=r(4128),o=r(14376),a=r(80545),s=r(96889),l=r(52867);class c extends s.n{constructor(e,t,r){super(e,"mat4",l.c.Draw,((r,n,i,o)=>r.setUniformMatrix4fv(e,t(n,i,o))),r)}}class u extends s.n{constructor(e,t,r){super(e,"mat4",l.c.Pass,((r,n,i)=>r.setUniformMatrix4fv(e,t(n,i))),r)}}var d=r(47613);a.Y;a.Y;function h(e,t){t.receiveShadows&&(e.fragment.uniforms.add(new u("shadowMapMatrix",((e,t)=>t.shadowMap.getShadowMapMatrices(e.origin)),4)),m(e))}function f(e,t){t.receiveShadows&&(e.fragment.uniforms.add(new c("shadowMapMatrix",((e,t)=>t.shadowMap.getShadowMapMatrices(e.origin)),4)),m(e))}function m(e){const t=e.fragment;t.include(n.W),t.uniforms.add(new d.N("shadowMapTex",((e,t)=>t.shadowMap.depthTexture)),new o.c("numCascades",((e,t)=>t.shadowMap.numCascades)),new i.E("cascadeDistances",((e,t)=>t.shadowMap.cascadeDistances))),t.code.add(a.H`int chooseCascade(float depth, out mat4 mat) {
vec4 distance = cascadeDistances;
int i = depth < distance[1] ? 0 : depth < distance[2] ? 1 : depth < distance[3] ? 2 : 3;
mat = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
return i;
}
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, vec3 lvpos) {
return vec2(float(i - 2 * (i / 2)) * 0.5, float(i / 2) * 0.5) + (numCascades == 1 ? 1.0 : 0.5) * lvpos.xy;
}
float readShadowMapDepth(vec2 uv, sampler2D _depthTex) {
return rgba2float(texture(_depthTex, uv));
}
float posIsInShadow(vec2 uv, vec3 lvpos, sampler2D _depthTex) {
return readShadowMapDepth(uv, _depthTex) < lvpos.z ? 1.0 : 0.0;
}
float filterShadow(vec2 uv, vec3 lvpos, float texSize, sampler2D _depthTex) {
float halfPixelSize = 0.5 / texSize;
vec2 st = fract((vec2(halfPixelSize) + uv) * texSize);
float s00 = posIsInShadow(uv + vec2(-halfPixelSize, -halfPixelSize), lvpos, _depthTex);
float s10 = posIsInShadow(uv + vec2(halfPixelSize, -halfPixelSize), lvpos, _depthTex);
float s11 = posIsInShadow(uv + vec2(halfPixelSize, halfPixelSize), lvpos, _depthTex);
float s01 = posIsInShadow(uv + vec2(-halfPixelSize, halfPixelSize), lvpos, _depthTex);
return mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);
}
float readShadowMap(const in vec3 _vpos, float _linearDepth) {
mat4 mat;
int i = chooseCascade(_linearDepth, mat);
if (i >= numCascades) { return 0.0; }
vec3 lvpos = lightSpacePosition(_vpos, mat);
if (lvpos.z >= 1.0) { return 0.0; }
if (lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) { return 0.0; }
vec2 uv = cascadeCoordinates(i, lvpos);
return filterShadow(uv, lvpos, float(textureSize(shadowMapTex, 0).x), shadowMapTex);
}`)}},21154:function(e,t,r){r.d(t,{MU:function(){return l},O1:function(){return c},QM:function(){return u},Sx:function(){return s},q2:function(){return a}});var n=r(45611),i=r(80545),o=r(97944);function a(e){e.vertex.uniforms.add(new o.k("colorTextureTransformMatrix",(e=>null!=e.colorTextureTransformMatrix?e.colorTextureTransformMatrix:(0,n.c)()))),e.varyings.add("colorUV","vec2"),e.vertex.code.add(i.H`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)}function s(e){e.vertex.uniforms.add(new o.k("normalTextureTransformMatrix",(e=>null!=e.normalTextureTransformMatrix?e.normalTextureTransformMatrix:(0,n.c)()))),e.varyings.add("normalUV","vec2"),e.vertex.code.add(i.H`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)}function l(e){e.vertex.uniforms.add(new o.k("emissiveTextureTransformMatrix",(e=>null!=e.emissiveTextureTransformMatrix?e.emissiveTextureTransformMatrix:(0,n.c)()))),e.varyings.add("emissiveUV","vec2"),e.vertex.code.add(i.H`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)}function c(e){e.vertex.uniforms.add(new o.k("occlusionTextureTransformMatrix",(e=>null!=e.occlusionTextureTransformMatrix?e.occlusionTextureTransformMatrix:(0,n.c)()))),e.varyings.add("occlusionUV","vec2"),e.vertex.code.add(i.H`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)}function u(e){e.vertex.uniforms.add(new o.k("metallicRoughnessTextureTransformMatrix",(e=>null!=e.metallicRoughnessTextureTransformMatrix?e.metallicRoughnessTextureTransformMatrix:(0,n.c)()))),e.varyings.add("metallicRoughnessUV","vec2"),e.vertex.code.add(i.H`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)}},14795:function(e,t,r){r.d(t,{A:function(){return b}});var n=r(24923),i=r(96889),o=r(52867);class a extends i.n{constructor(e,t,r){super(e,"vec4",o.c.Pass,((r,n,i)=>r.setUniform4fv(e,t(n,i))),r)}}class s extends i.n{constructor(e,t,r){super(e,"float",o.c.Pass,((r,n,i)=>r.setUniform1fv(e,t(n,i))),r)}}var l=r(80545),c=r(97944),u=r(6360),d=(r(44114),r(51020),r(26011),r(13030),r(37072),r(90183),r(26671)),h=(r(67886),r(456)),f=(r(59384),r(71457)),m=r(3734),p=r(76543),v=(r(37679),r(69292),r(29916));let g=class extends m.A{constructor(){super(...arguments),this.SCENEVIEW_HITTEST_RETURN_INTERSECTOR=!1,this.DECONFLICTOR_SHOW_VISIBLE=!1,this.DECONFLICTOR_SHOW_INVISIBLE=!1,this.DECONFLICTOR_SHOW_GRID=!1,this.LABELS_SHOW_BORDER=!1,this.TEXT_SHOW_BASELINE=!1,this.TEXT_SHOW_BORDER=!1,this.OVERLAY_DRAW_DEBUG_TEXTURE=!1,this.OVERLAY_SHOW_CENTER=!1,this.SHOW_POI=!1,this.TESTS_DISABLE_OPTIMIZATIONS=!1,this.TESTS_DISABLE_FAST_UPDATES=!1,this.DRAW_MESH_GEOMETRY_NORMALS=!1,this.FEATURE_TILE_FETCH_SHOW_TILES=!1,this.FEATURE_TILE_TREE_SHOW_TILES=!1,this.TERRAIN_TILE_TREE_SHOW_TILES=!1,this.I3S_TREE_SHOW_TILES=!1,this.I3S_SHOW_MODIFICATIONS=!1,this.LOD_INSTANCE_RENDERER_DISABLE_UPDATES=!1,this.LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL=!1,this.EDGES_SHOW_HIDDEN_TRANSPARENT_EDGES=!1,this.LINE_WIREFRAMES=!1}};(0,f._)([(0,p.MZ)()],g.prototype,"SCENEVIEW_HITTEST_RETURN_INTERSECTOR",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"DECONFLICTOR_SHOW_VISIBLE",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"DECONFLICTOR_SHOW_INVISIBLE",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"DECONFLICTOR_SHOW_GRID",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"LABELS_SHOW_BORDER",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"TEXT_SHOW_BASELINE",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"TEXT_SHOW_BORDER",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"OVERLAY_DRAW_DEBUG_TEXTURE",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"OVERLAY_SHOW_CENTER",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"SHOW_POI",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"TESTS_DISABLE_OPTIMIZATIONS",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"TESTS_DISABLE_FAST_UPDATES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"DRAW_MESH_GEOMETRY_NORMALS",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"FEATURE_TILE_FETCH_SHOW_TILES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"FEATURE_TILE_TREE_SHOW_TILES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"TERRAIN_TILE_TREE_SHOW_TILES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"I3S_TREE_SHOW_TILES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"I3S_SHOW_MODIFICATIONS",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"LOD_INSTANCE_RENDERER_DISABLE_UPDATES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"EDGES_SHOW_HIDDEN_TRANSPARENT_EDGES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"LINE_WIREFRAMES",void 0),g=(0,f._)([(0,v.$)("geoscene.views.3d.support.DebugFlags")],g);new g;var _,x;!function(e){e[e.Undefined=0]="Undefined",e[e.DefinedSize=1]="DefinedSize",e[e.DefinedScale=2]="DefinedScale"}(_||(_={})),function(e){e[e.Undefined=0]="Undefined",e[e.DefinedAngle=1]="DefinedAngle"}(x||(x={}));l.Y;(0,d.c)(),(0,h.c)(),(0,d.c)();r(18883);const T=8;function b(e,t){const{vertex:r,attributes:i}=e;t.hasVvInstancing&&(t.vvSize||t.vvColor)&&i.add(u.r.INSTANCEFEATUREATTRIBUTE,"vec4"),t.vvSize?(r.uniforms.add(new n.t("vvSizeMinSize",(e=>e.vvSize.minSize))),r.uniforms.add(new n.t("vvSizeMaxSize",(e=>e.vvSize.maxSize))),r.uniforms.add(new n.t("vvSizeOffset",(e=>e.vvSize.offset))),r.uniforms.add(new n.t("vvSizeFactor",(e=>e.vvSize.factor))),r.uniforms.add(new c.k("vvSymbolRotationMatrix",(e=>e.vvSymbolRotationMatrix))),r.uniforms.add(new n.t("vvSymbolAnchor",(e=>e.vvSymbolAnchor))),r.code.add(l.H`vec3 vvScale(vec4 _featureAttribute) {
return clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);
}
vec4 vvTransformPosition(vec3 position, vec4 _featureAttribute) {
return vec4(vvSymbolRotationMatrix * ( vvScale(_featureAttribute) * (position + vvSymbolAnchor)), 1.0);
}`),r.code.add(l.H`
      const float eps = 1.192092896e-07;
      vec4 vvTransformNormal(vec3 _normal, vec4 _featureAttribute) {
        vec3 vvScale = clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize + eps, vvSizeMaxSize);
        return vec4(vvSymbolRotationMatrix * _normal / vvScale, 1.0);
      }

      ${t.hasVvInstancing?l.H`
      vec4 vvLocalNormal(vec3 _normal) {
        return vvTransformNormal(_normal, instanceFeatureAttribute);
      }

      vec4 localPosition() {
        return vvTransformPosition(position, instanceFeatureAttribute);
      }`:""}
    `)):r.code.add(l.H`vec4 localPosition() { return vec4(position, 1.0); }
vec4 vvLocalNormal(vec3 _normal) { return vec4(_normal, 1.0); }`),t.vvColor?(r.constants.add("vvColorNumber","int",T),r.uniforms.add(new s("vvColorValues",(e=>e.vvColor.values),T),new a("vvColorColors",(e=>e.vvColor.colors),T)),r.code.add(l.H`
      vec4 interpolateVVColor(float value) {
        if (value <= vvColorValues[0]) {
          return vvColorColors[0];
        }

        for (int i = 1; i < vvColorNumber; ++i) {
          if (vvColorValues[i] >= value) {
            float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
            return mix(vvColorColors[i-1], vvColorColors[i], f);
          }
        }
        return vvColorColors[vvColorNumber - 1];
      }

      vec4 vvGetColor(vec4 featureAttribute) {
        return interpolateVVColor(featureAttribute.y);
      }

      ${t.hasVvInstancing?l.H`
            vec4 vvColor() {
              return vvGetColor(instanceFeatureAttribute);
            }`:"vec4 vvColor() { return vec4(1.0); }"}
    `)):r.code.add(l.H`vec4 vvColor() { return vec4(1.0); }`)}},19889:function(e,t,r){r.d(t,{H:function(){return n},y:function(){return i}});const n=.1,i=.001},25217:function(e,t,r){r.d(t,{S:function(){return c}});var n=r(19889),i=r(80545);function o(e){e.fragment.code.add(i.H`
    #define discardOrAdjustAlpha(color) { if (color.a < ${i.H.float(n.y)}) { discard; } }
  `)}var a=r(96889);r(52867);a.n;var s=r(45804),l=r(78964);function c(e,t){u(e,t,new s.m("textureAlphaCutoff",(e=>e.textureAlphaCutoff)))}function u(e,t,r){const n=e.fragment;switch(t.alphaDiscardMode!==l.sf.Mask&&t.alphaDiscardMode!==l.sf.MaskBlend||n.uniforms.add(r),t.alphaDiscardMode){case l.sf.Blend:return e.include(o);case l.sf.Opaque:n.code.add(i.H`void discardOrAdjustAlpha(inout vec4 color) {
color.a = 1.0;
}`);break;case l.sf.Mask:n.code.add(i.H`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } else { color.a = 1.0; } }`);break;case l.sf.MaskBlend:e.fragment.code.add(i.H`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } }`)}}},75049:function(e,t,r){r.d(t,{I:function(){return u},N:function(){return f}});var n=r(28589),i=r(15329),o=r(22095),a=r(18439),s=r(13418),l=r(4128),c=r(80545);function u(e){e.fragment.uniforms.add(new l.E("projInfo",((e,t)=>d(t)))),e.fragment.uniforms.add(new s.G("zScale",((e,t)=>f(t)))),e.fragment.code.add(c.H`vec3 reconstructPosition(vec2 fragCoord, float depth) {
return vec3((fragCoord * projInfo.xy + projInfo.zw) * (zScale.x * depth + zScale.y), depth);
}`)}function d(e){const t=e.camera.projectionMatrix;return 0===t[11]?(0,o.s)(h,2/(e.camera.fullWidth*t[0]),2/(e.camera.fullHeight*t[5]),(1+t[12])/t[0],(1+t[13])/t[5]):(0,o.s)(h,-2/(e.camera.fullWidth*t[0]),-2/(e.camera.fullHeight*t[5]),(1-t[8])/t[0],(1-t[9])/t[5])}const h=(0,a.c)();function f(e){return 0===e.camera.projectionMatrix[11]?(0,n.s)(m,0,1):(0,n.s)(m,1,0)}const m=(0,i.a)()},52061:function(e,t,r){r.d(t,{u:function(){return i}});var n=r(80545);function i({code:e},t){t.doublePrecisionRequiresObfuscation?e.add(n.H`vec3 dpPlusFrc(vec3 a, vec3 b) {
return mix(a, a + b, vec3(notEqual(b, vec3(0))));
}
vec3 dpMinusFrc(vec3 a, vec3 b) {
return mix(vec3(0), a - b, vec3(notEqual(a, b)));
}
vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = dpPlusFrc(hiA, hiB);
vec3 e = dpMinusFrc(t1, hiA);
vec3 t2 = dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;
return t1 + t2;
}`):e.add(n.H`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = hiA + hiB;
vec3 e = t1 - hiA;
vec3 t2 = ((hiB - e) + (hiA - (t1 - e))) + loA + loB;
return t1 + t2;
}`)}},1898:function(e,t,r){r.d(t,{N:function(){return a}});var n=r(36268),i=r(80545);function o(e){e.code.add(i.H`vec4 premultiplyAlpha(vec4 v) {
return vec4(v.rgb * v.a, v.a);
}
vec3 rgb2hsv(vec3 c) {
vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
float d = q.x - min(q.w, q.y);
float e = 1.0e-10;
return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), min(d / (q.x + e), 1.0), q.x);
}
vec3 hsv2rgb(vec3 c) {
vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float rgb2v(vec3 c) {
return max(c.x, max(c.y, c.z));
}`)}function a(e){e.include(o),e.code.add(i.H`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${i.H.int(n.k5.Multiply)}) {
        return allMixed;
      }
      if (mode == ${i.H.int(n.k5.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${i.H.int(n.k5.Replace)}) {
        return externalColor;
      }

      // tint (or something invalid)
      float vIn = rgb2v(internalMixed);
      vec3 hsvTint = rgb2hsv(externalColor);
      vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
      return hsv2rgb(hsvOut);
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${i.H.int(n.k5.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${i.H.int(n.k5.Replace)}) {
        return externalOpacity;
      }

      // multiply or tint (or something invalid)
      return allMixed;
    }
  `)}},82095:function(e,t,r){r.d(t,{W:function(){return i}});var n=r(80545);function i(e){e.code.add(n.H`const float MAX_RGBA_FLOAT =
255.0 / 256.0 +
255.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 / 256.0;
const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
vec4 float2rgba(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);
vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);
const float toU8AsFloat = 1.0 / 255.0;
return fixedPointU8 * toU8AsFloat;
}
const vec4 RGBA_2_FLOAT_FACTORS = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgba2float(vec4 rgba) {
return dot(rgba, RGBA_2_FLOAT_FACTORS);
}`)}},35525:function(e,t,r){r.d(t,{yu:function(){return x},NB:function(){return T},S7:function(){return S}});var n,i,o,a,s,l=r(90183),c=r(26671),u=r(67886),d=r(456);r(99359);!function(e){e[e.INNER=0]="INNER",e[e.OUTER=1]="OUTER"}(n||(n={})),function(e){e[e.REGULAR=0]="REGULAR",e[e.HAS_NORTH_POLE=1]="HAS_NORTH_POLE",e[e.HAS_SOUTH_POLE=2]="HAS_SOUTH_POLE",e[e.HAS_BOTH_POLES=3]="HAS_BOTH_POLES"}(i||(i={})),function(e){e[e.OFF=0]="OFF",e[e.ON=1]="ON"}(o||(o={})),function(e){e[e.Color=0]="Color",e[e.ColorNoRasterImage=1]="ColorNoRasterImage",e[e.Highlight=2]="Highlight",e[e.Water=3]="Water",e[e.Occluded=4]="Occluded",e[e.ObjectAndLayerIdColor=5]="ObjectAndLayerIdColor"}(a||(a={})),function(e){e[e.FADING=0]="FADING",e[e.IMMEDIATE=1]="IMMEDIATE",e[e.UNFADED=2]="UNFADED"}(s||(s={}));var h;r(78964);!function(e){e[e.None=0]="None",e[e.ColorAndWater=1]="ColorAndWater",e[e.Highlight=2]="Highlight",e[e.Occluded=3]="Occluded",e[e.ObjectAndLayerIdColor=4]="ObjectAndLayerIdColor"}(h||(h={}));var f=r(48186),m=r(24923),p=(r(45804),r(96889)),v=r(52867);class g extends p.n{constructor(e,t){super(e,"mat4",v.c.Draw,((r,n,i)=>r.setUniformMatrix4fv(e,t(n,i))))}}var _=r(40275);function x(e,t){t.instancedDoublePrecision?e.constants.add("cameraPosition","vec3",d.Z):e.uniforms.add(new f.W("cameraPosition",((e,t)=>(0,u.s)(A,t.camera.viewInverseTransposeMatrix[3]-e.origin[0],t.camera.viewInverseTransposeMatrix[7]-e.origin[1],t.camera.viewInverseTransposeMatrix[11]-e.origin[2]))))}function T(e,t){if(!t.instancedDoublePrecision)return void e.uniforms.add(new _.X("proj",((e,t)=>t.camera.projectionMatrix)),new g("view",((e,t)=>(0,l.w)(b,t.camera.viewMatrix,e.origin))),new f.W("localOrigin",(e=>e.origin)));const r=e=>(0,u.s)(A,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]);e.uniforms.add(new _.X("proj",((e,t)=>t.camera.projectionMatrix)),new _.X("view",((e,t)=>(0,l.w)(b,t.camera.viewMatrix,r(t)))),new m.t("localOrigin",((e,t)=>r(t))))}const b=(0,c.c)(),A=(0,d.c)();function S(e){e.uniforms.add(new _.X("viewNormal",((e,t)=>t.camera.viewInverseTransposeMatrix)))}},53543:function(e,t,r){r.d(t,{t:function(){return o}});var n=r(96889),i=r(52867);class o extends n.n{constructor(e,t){super(e,"vec2",i.c.Draw,((r,n,i,o)=>r.setUniform2fv(e,t(n,i,o))))}}},13418:function(e,t,r){r.d(t,{G:function(){return o}});var n=r(96889),i=r(52867);class o extends n.n{constructor(e,t){super(e,"vec2",i.c.Pass,((r,n,i)=>r.setUniform2fv(e,t(n,i))))}}},48186:function(e,t,r){r.d(t,{W:function(){return o}});var n=r(96889),i=r(52867);class o extends n.n{constructor(e,t){super(e,"vec3",i.c.Draw,((r,n,i,o)=>r.setUniform3fv(e,t(n,i,o))))}}},24923:function(e,t,r){r.d(t,{t:function(){return o}});var n=r(96889),i=r(52867);class o extends n.n{constructor(e,t){super(e,"vec3",i.c.Pass,((r,n,i)=>r.setUniform3fv(e,t(n,i))))}}},4128:function(e,t,r){r.d(t,{E:function(){return o}});var n=r(96889),i=r(52867);class o extends n.n{constructor(e,t){super(e,"vec4",i.c.Pass,((r,n,i)=>r.setUniform4fv(e,t(n,i))))}}},45804:function(e,t,r){r.d(t,{m:function(){return o}});var n=r(96889),i=r(52867);class o extends n.n{constructor(e,t){super(e,"float",i.c.Pass,((r,n,i)=>r.setUniform1f(e,t(n,i))))}}},14376:function(e,t,r){r.d(t,{c:function(){return o}});var n=r(96889),i=r(52867);class o extends n.n{constructor(e,t){super(e,"int",i.c.Pass,((r,n,i)=>r.setUniform1i(e,t(n,i))))}}},94125:function(e,t,r){r.d(t,{h:function(){return o}});var n=r(96889),i=r(52867);class o extends n.n{constructor(e,t){super(e,"mat3",i.c.Draw,((r,n,i)=>r.setUniformMatrix3fv(e,t(n,i))))}}},97944:function(e,t,r){r.d(t,{k:function(){return o}});var n=r(96889),i=r(52867);class o extends n.n{constructor(e,t){super(e,"mat3",i.c.Pass,((r,n,i)=>r.setUniformMatrix3fv(e,t(n,i))))}}},40275:function(e,t,r){r.d(t,{X:function(){return o}});var n=r(96889),i=r(52867);class o extends n.n{constructor(e,t){super(e,"mat4",i.c.Pass,((r,n,i)=>r.setUniformMatrix4fv(e,t(n,i))))}}},72325:function(e,t,r){r.d(t,{N5:function(){return l}});r(44114),r(17642),r(58004),r(33853),r(45876),r(32475),r(15024),r(31698);var n=r(47966),i=r(15114),o=r(28544);const a=i.A.getLogger("geoscene.views.3d.webgl-engine.core.shaderModules.shaderBuilder");class s{constructor(){this._includedModules=new Map}include(e,t){if(this._includedModules.has(e)){const r=this._includedModules.get(e);if(r!==t){a.error("Trying to include shader module multiple times with different sets of options.");const t=new Set;for(const n of Object.keys(r))r[n]!==e[n]&&t.add(n);for(const n of Object.keys(e))r[n]!==e[n]&&t.add(n);t.forEach((t=>console.error(`  ${t}: current ${r[t]} new ${e[t]}`)))}}else this._includedModules.set(e,t),e(this.builder,t)}}class l extends s{constructor(){super(...arguments),this.vertex=new d,this.fragment=new d,this.attributes=new h,this.varyings=new f,this.extensions=new m,this.constants=new p}get fragmentUniforms(){return this.fragment.uniforms.entries}get builder(){return this}generate(e){const t=this.extensions.generateSource(e),r=this.attributes.generateSource(e),n=this.varyings.generateSource(e),i="vertex"===e?this.vertex:this.fragment,o=i.uniforms.generateSource(),a=i.code.generateSource(),s="vertex"===e?g:v,l=this.constants.generateSource().concat(i.constants.generateSource());return`#version 300 es\n${t.join("\n")}\n\n${s}\n\n${l.join("\n")}\n\n${o.join("\n")}\n\n${r.join("\n")}\n\n${n.join("\n")}\n\n${a.join("\n")}`}generateBind(e,t){const r=new Map;this.vertex.uniforms.entries.forEach((t=>{const n=t.bind[e];null!=n&&r.set(t.name,n)})),this.fragment.uniforms.entries.forEach((t=>{const n=t.bind[e];null!=n&&r.set(t.name,n)}));const n=Array.from(r.values()),i=n.length;return(e,r,o)=>{for(let a=0;a<i;++a)n[a](t,e,r,o)}}}class c{constructor(){this._entries=new Map}add(...e){for(const t of e)this._add(t)}get(e){return this._entries.get(e)}_add(e){if(null!=e){if(this._entries.has(e.name)&&!this._entries.get(e.name).equals(e))throw new n.A(`Duplicate uniform name ${e.name} for different uniform type`);this._entries.set(e.name,e)}else a.error(`Trying to add null Uniform from ${(new Error).stack}.`)}generateSource(){return Array.from(this._entries.values()).map((e=>null!=e.arraySize?`uniform ${e.type} ${e.name}[${e.arraySize}];`:`uniform ${e.type} ${e.name};`))}get entries(){return Array.from(this._entries.values())}}class u{constructor(){this._entries=new Array}add(e){this._entries.push(e)}generateSource(){return this._entries}}class d extends s{constructor(){super(...arguments),this.uniforms=new c,this.code=new u,this.constants=new p}get builder(){return this}}class h{constructor(){this._entries=new Array}add(e,t){this._entries.push([e,t])}generateSource(e){return"fragment"===e?[]:this._entries.map((e=>`in ${e[1]} ${e[0]};`))}}class f{constructor(){this._entries=new Map}add(e,t){this._entries.has(e)&&(0,o.vA)(this._entries.get(e)===t),this._entries.set(e,t)}generateSource(e){const t=new Array;return this._entries.forEach(((r,n)=>t.push("vertex"===e?`out ${r} ${n};`:`in ${r} ${n};`))),t}}class m{constructor(){this._entries=new Set}add(e){this._entries.add(e)}generateSource(e){const t="vertex"===e?m.ALLOWLIST_VERTEX:m.ALLOWLIST_FRAGMENT;return Array.from(this._entries).filter((e=>t.includes(e))).map((e=>`#extension ${e} : enable`))}}m.ALLOWLIST_FRAGMENT=["GL_EXT_shader_texture_lod","GL_OES_standard_derivatives"],m.ALLOWLIST_VERTEX=[];class p{constructor(){this._entries=new Set}add(e,t,r){let n="ERROR_CONSTRUCTOR_STRING";switch(t){case"float":n=p._numberToFloatStr(r);break;case"int":n=p._numberToIntStr(r);break;case"bool":n=r.toString();break;case"vec2":n=`vec2(${p._numberToFloatStr(r[0])},                            ${p._numberToFloatStr(r[1])})`;break;case"vec3":n=`vec3(${p._numberToFloatStr(r[0])},                            ${p._numberToFloatStr(r[1])},                            ${p._numberToFloatStr(r[2])})`;break;case"vec4":n=`vec4(${p._numberToFloatStr(r[0])},                            ${p._numberToFloatStr(r[1])},                            ${p._numberToFloatStr(r[2])},                            ${p._numberToFloatStr(r[3])})`;break;case"ivec2":n=`ivec2(${p._numberToIntStr(r[0])},                             ${p._numberToIntStr(r[1])})`;break;case"ivec3":n=`ivec3(${p._numberToIntStr(r[0])},                             ${p._numberToIntStr(r[1])},                             ${p._numberToIntStr(r[2])})`;break;case"ivec4":n=`ivec4(${p._numberToIntStr(r[0])},                             ${p._numberToIntStr(r[1])},                             ${p._numberToIntStr(r[2])},                             ${p._numberToIntStr(r[3])})`;break;case"mat2":case"mat3":case"mat4":n=`${t}(${Array.prototype.map.call(r,(e=>p._numberToFloatStr(e))).join(", ")})`}return this._entries.add(`const ${t} ${e} = ${n};`),this}static _numberToIntStr(e){return e.toFixed(0)}static _numberToFloatStr(e){return Number.isInteger(e)?e.toFixed(1):e.toString()}generateSource(){return Array.from(this._entries)}}const v="#ifdef GL_FRAGMENT_PRECISION_HIGH\n  precision highp float;\n  precision highp sampler2D;\n#else\n  precision mediump float;\n  precision mediump sampler2D;\n#endif\n\nout vec4 fragColor;",g="precision highp float;\nprecision highp sampler2D;"},47076:function(e,t,r){r.d(t,{o:function(){return o}});var n=r(96889),i=r(52867);class o extends n.n{constructor(e,t){super(e,"sampler2D",i.c.Draw,((r,n,i)=>r.bindTexture(e,t(n,i))))}}},47613:function(e,t,r){r.d(t,{N:function(){return o}});var n=r(96889),i=r(52867);class o extends n.n{constructor(e,t){super(e,"sampler2D",i.c.Pass,((r,n,i)=>r.bindTexture(e,t(n,i))))}}},96889:function(e,t,r){r.d(t,{n:function(){return i}});var n=r(52867);class i{constructor(e,t,r,i,o=null){this.name=e,this.type=t,this.arraySize=o,this.bind={[n.c.Pass]:null,[n.c.Draw]:null},null!=r&&null!=i&&(this.bind[r]=i)}equals(e){return this.type===e.type&&this.name===e.name&&this.arraySize===e.arraySize}}},80545:function(e,t,r){r.d(t,{H:function(){return o},Y:function(){return i}});class n{}const i=n;function o(e,...t){let r="";for(let n=0;n<t.length;n++)r+=e[n]+t[n];return r+=e[e.length-1],r}!function(e){function t(e){return Math.round(e).toString()}function r(e){return e.toPrecision(8)}e.int=t,e.float=r}(o||(o={}))},52867:function(e,t,r){var n;r.d(t,{c:function(){return n}}),function(e){e[e.Pass=0]="Pass",e[e.Draw=1]="Draw"}(n||(n={}))},28160:function(e,t,r){r.d(t,{$:function(){return n}});class n{constructor(e,t){this._module=e,this._loadModule=t}get(){return this._module}async reload(){return this._module=await this._loadModule(),this._module}}},75887:function(e,t,r){r.d(t,{w:function(){return o}});var n=r(79908),i=r(73719);class o{constructor(e,t,r){this.release=r,this.initializeConfiguration(e,t),this._configuration=t.snapshot(),this._program=this.initializeProgram(e),this._pipeline=this.initializePipeline(e.rctx.capabilities)}destroy(){this._program=(0,n.WD)(this._program),this._pipeline=this._configuration=null}reload(e){(0,n.WD)(this._program),this._program=this.initializeProgram(e),this._pipeline=this.initializePipeline(e.rctx.capabilities)}get program(){return this._program}get compiled(){return this.program.compiled}get key(){return this._configuration.key}get configuration(){return this._configuration}bindPipelineState(e,t=null,r){e.setPipelineState(this.getPipelineState(t,r))}ensureAttributeLocations(e){this.program.assertCompatibleVertexAttributeLocations(e)}get primitiveType(){return i.WR.TRIANGLES}getPipelineState(e,t){return this._pipeline}initializeConfiguration(e,t){}}},83853:function(e,t,r){r.d(t,{K:function(){return i},W:function(){return o}});r(44114);var n=r(80545);class i extends n.Y{constructor(){super(),this._key="",this._keyDirty=!1,this._parameterBits=this._parameterBits?this._parameterBits.map((()=>0)):[],this._parameterNames||(this._parameterNames=[])}get key(){return this._keyDirty&&(this._keyDirty=!1,this._key=String.fromCharCode.apply(String,this._parameterBits)),this._key}snapshot(){const e=this._parameterNames,t={key:this.key};for(const r of e)t[r]=this[r];return t}}function o(e={}){return(t,r)=>{if(t._parameterNames=t._parameterNames??[],t._parameterNames.push(r),null!=e.constValue)Object.defineProperty(t,r,{get:()=>e.constValue});else{const n=t._parameterNames.length-1,i=e.count||2,o=Math.ceil(Math.log2(i)),a=t._parameterBits??[0];let s=0;for(;a[s]+o>16;)s++,s>=a.length&&a.push(0);t._parameterBits=a;const l=a[s],c=(1<<o)-1<<l;a[s]+=o,Object.defineProperty(t,r,{get(){return this[n]},set(e){if(this[n]!==e&&(this[n]=e,this._keyDirty=!0,this._parameterBits[s]=this._parameterBits[s]&~c|+e<<l&c,"number"!=typeof e&&"boolean"!=typeof e))throw new Error("Configuration value for "+r+" must be boolean or number, got "+typeof e)}})}}}},65246:function(e,t,r){r.d(t,{n:function(){return n}});class n{constructor(e,t,r=!1,n=t){this.data=e,this.size=t,this.exclusive=r,this.stride=n}}},60548:function(e,t,r){r.d(t,{J:function(){return i}});var n=r(62242);class i{constructor(){this.id=(0,n.L)()}unload(){}}},99484:function(e,t,r){var n;r.d(t,{X:function(){return n}}),function(e){e[e.Layer=0]="Layer",e[e.Object=1]="Object",e[e.Mesh=2]="Mesh",e[e.Line=3]="Line",e[e.Point=4]="Point",e[e.Material=5]="Material",e[e.Texture=6]="Texture",e[e.COUNT=7]="COUNT"}(n||(n={}))},37985:function(e,t,r){r.d(t,{D:function(){return i}});var n=r(6360);const i=new Map([[n.r.POSITION,0],[n.r.NORMAL,1],[n.r.NORMALCOMPRESSED,1],[n.r.UV0,2],[n.r.COLOR,3],[n.r.COLORFEATUREATTRIBUTE,3],[n.r.SIZE,4],[n.r.TANGENT,4],[n.r.AUXPOS1,5],[n.r.SYMBOLCOLOR,5],[n.r.AUXPOS2,6],[n.r.FEATUREATTRIBUTE,6],[n.r.INSTANCEFEATUREATTRIBUTE,6],[n.r.INSTANCECOLOR,7],[n.r.OBJECTANDLAYERIDCOLOR,7],[n.r.INSTANCEOBJECTANDLAYERIDCOLOR,7],[n.r.MODEL,8],[n.r.MODELNORMAL,12],[n.r.MODELORIGINHI,11],[n.r.MODELORIGINLO,15]])},12591:function(e,t,r){r.d(t,{m:function(){return l}});var n=r(79908),i=r(71120),o=r(80545),a=r(78964);class s{constructor(e){this._material=e.material,this._techniqueRepository=e.techniqueRep,this._output=e.output}dispose(){this._techniqueRepository.release(this._technique)}get technique(){return this._technique}get _stippleTextureRepository(){return this._techniqueRepository.constructionContext.stippleTextureRepository}get _markerTextureRepository(){return this._techniqueRepository.constructionContext.markerTextureRepository}ensureTechnique(e,t){return this._technique=this._techniqueRepository.releaseAndAcquire(e,this._material.getConfiguration(this._output,t),this._technique),this._technique}ensureResources(e){return a.Am.LOADED}}class l extends s{constructor(e){super(e),this._numLoading=0,this._disposed=!1,this._textureRepository=e.textureRep,this._textureId=e.textureId,this._acquire(e.textureId,(e=>this._texture=e)),this._acquire(e.normalTextureId,(e=>this._textureNormal=e)),this._acquire(e.emissiveTextureId,(e=>this._textureEmissive=e)),this._acquire(e.occlusionTextureId,(e=>this._textureOcclusion=e)),this._acquire(e.metallicRoughnessTextureId,(e=>this._textureMetallicRoughness=e))}dispose(){this._texture=(0,n.Gz)(this._texture),this._textureNormal=(0,n.Gz)(this._textureNormal),this._textureEmissive=(0,n.Gz)(this._textureEmissive),this._textureOcclusion=(0,n.Gz)(this._textureOcclusion),this._textureMetallicRoughness=(0,n.Gz)(this._textureMetallicRoughness),this._disposed=!0}ensureResources(e){return 0===this._numLoading?a.Am.LOADED:a.Am.LOADING}get textureBindParameters(){return new c(null!=this._texture?this._texture.glTexture:null,null!=this._textureNormal?this._textureNormal.glTexture:null,null!=this._textureEmissive?this._textureEmissive.glTexture:null,null!=this._textureOcclusion?this._textureOcclusion.glTexture:null,null!=this._textureMetallicRoughness?this._textureMetallicRoughness.glTexture:null)}updateTexture(e){null!=this._texture&&e===this._texture.id||(this._texture=(0,n.Gz)(this._texture),this._textureId=e,this._acquire(this._textureId,(e=>this._texture=e)))}_acquire(e,t){if(null==e)return void t(null);const r=this._textureRepository.acquire(e);if((0,i.$X)(r))return++this._numLoading,void r.then((e=>{if(this._disposed)return(0,n.Gz)(e),void t(null);t(e)})).finally((()=>--this._numLoading));t(r)}}class c extends o.Y{constructor(e=null,t=null,r=null,n=null,i=null){super(),this.texture=e,this.textureNormal=t,this.textureEmissive=r,this.textureOcclusion=n,this.textureMetallicRoughness=i}}},18883:function(e,t,r){r.d(t,{im:function(){return u},m$:function(){return o}});var n=r(456),i=r(80545);var o,a=r(60548),s=r(99484),l=r(37985),c=r(78087);class u extends a.J{constructor(e,t){super(),this.type=s.X.Material,this.supportsEdges=!1,this._visible=!0,this._renderPriority=0,this._insertOrder=0,this._vertexAttributeLocations=l.D,this._pp0=(0,n.f)(0,0,1),this._pp1=(0,n.f)(0,0,0),this._parameters=(0,c.qu)(e,t),this.validateParameters(this._parameters)}dispose(){}get parameters(){return this._parameters}update(e){return!1}setParameters(e,t=!0){(0,c.MB)(this._parameters,e)&&(this.validateParameters(this._parameters),t&&this.parametersChanged())}validateParameters(e){}get visible(){return this._visible}set visible(e){e!==this._visible&&(this._visible=e,this.parametersChanged())}shouldRender(e){return this.isVisible()&&this.isVisibleForOutput(e.output)&&0!=(this.renderOccluded&e.renderOccludedMask)}isVisibleForOutput(e){return!0}get renderOccluded(){return this.parameters.renderOccluded}get renderPriority(){return this._renderPriority}set renderPriority(e){e!==this._renderPriority&&(this._renderPriority=e,this.parametersChanged())}get insertOrder(){return this._insertOrder}set insertOrder(e){e!==this._insertOrder&&(this._insertOrder=e,this.parametersChanged())}get vertexAttributeLocations(){return this._vertexAttributeLocations}isVisible(){return this._visible}parametersChanged(){null!=this.repository&&this.repository.materialChanged(this)}intersectDraped(e,t,r,n,i,o){return this._pp0[0]=this._pp1[0]=n[0],this._pp0[1]=this._pp1[1]=n[1],this.intersect(e,t,r,this._pp0,this._pp1,i)}}!function(e){e[e.None=0]="None",e[e.Occlude=1]="Occlude",e[e.Transparent=2]="Transparent",e[e.OccludeAndTransparent=4]="OccludeAndTransparent",e[e.OccludeAndTransparentStencil=8]="OccludeAndTransparentStencil",e[e.Opaque=16]="Opaque"}(o||(o={}));i.Y},29632:function(e,t,r){r.d(t,{AJ:function(){return l},K_:function(){return f},V0:function(){return a},aB:function(){return h},ez:function(){return c},xt:function(){return u}});var n=r(26723),i=r(73719),o=r(46896);const a=(0,o.p3)(i.dn.SRC_ALPHA,i.dn.ONE,i.dn.ONE_MINUS_SRC_ALPHA,i.dn.ONE_MINUS_SRC_ALPHA),s=(0,o.ox)(i.dn.ONE,i.dn.ONE),l=(0,o.ox)(i.dn.ZERO,i.dn.ONE_MINUS_SRC_ALPHA);function c(e){return e===n.y.FrontFace?null:e===n.y.Alpha?l:s}const u=5e5,d={factor:-1,units:-2};function h(e){return e?d:null}function f(e,t=i.MT.LESS){return e===n.y.NONE||e===n.y.FrontFace?t:i.MT.LEQUAL}},8114:function(e,t,r){r.d(t,{B:function(){return a}});r(44114);var n=r(42079),i=r(52867),o=r(82236);class a{constructor(e,t,r){this._context=e,this._locations=r,this._textures=new Map,this._freeTextureUnits=new n.A({deallocator:null}),this._glProgram=e.programCache.acquire(t.generate("vertex"),t.generate("fragment"),r),this._glProgram.stop=()=>{throw new Error("Wrapped _glProgram used directly")},this.bindPass=t.generateBind(i.c.Pass,this),this.bindDraw=t.generateBind(i.c.Draw,this),this._fragmentUniforms=(0,o.en)()?t.fragmentUniforms:null}dispose(){this._glProgram.dispose()}get glName(){return this._glProgram.glName}get compiled(){return this._glProgram.compiled}setUniform1b(e,t){this._glProgram.setUniform1i(e,t?1:0)}setUniform1i(e,t){this._glProgram.setUniform1i(e,t)}setUniform1f(e,t){this._glProgram.setUniform1f(e,t)}setUniform2fv(e,t){this._glProgram.setUniform2fv(e,t)}setUniform3fv(e,t){this._glProgram.setUniform3fv(e,t)}setUniform4fv(e,t){this._glProgram.setUniform4fv(e,t)}setUniformMatrix3fv(e,t){this._glProgram.setUniformMatrix3fv(e,t)}setUniformMatrix4fv(e,t){this._glProgram.setUniformMatrix4fv(e,t)}setUniform1fv(e,t){this._glProgram.setUniform1fv(e,t)}setUniform1iv(e,t){this._glProgram.setUniform1iv(e,t)}setUniform2iv(e,t){this._glProgram.setUniform3iv(e,t)}setUniform3iv(e,t){this._glProgram.setUniform3iv(e,t)}setUniform4iv(e,t){this._glProgram.setUniform4iv(e,t)}assertCompatibleVertexAttributeLocations(e){e.locations!==this._locations&&console.error("VertexAttributeLocations are incompatible")}stop(){this._textures.clear(),this._freeTextureUnits.clear()}bindTexture(e,t){if(null==t||null==t.glName){const t=this._textures.get(e);return t&&(this._context.bindTexture(null,t.unit),this._freeTextureUnit(t),this._textures.delete(e)),null}let r=this._textures.get(e);return null==r?(r=this._allocTextureUnit(t),this._textures.set(e,r)):r.texture=t,this._context.useProgram(this),this.setUniform1i(e,r.unit),this._context.bindTexture(t,r.unit),r.unit}rebindTextures(){this._context.useProgram(this),this._textures.forEach(((e,t)=>{this._context.bindTexture(e.texture,e.unit),this.setUniform1i(t,e.unit)})),null!=this._fragmentUniforms&&this._fragmentUniforms.forEach((e=>{"sampler2D"!==e.type&&"samplerCube"!==e.type||this._textures.has(e.name)||console.error(`Texture sampler ${e.name} has no bound texture`)}))}_allocTextureUnit(e){return{texture:e,unit:0===this._freeTextureUnits.length?this._textures.size:this._freeTextureUnits.pop()}}_freeTextureUnit(e){this._freeTextureUnits.push(e.unit)}}},26723:function(e,t,r){var n;r.d(t,{y:function(){return n}}),function(e){e[e.Color=0]="Color",e[e.Alpha=1]="Alpha",e[e.FrontFace=2]="FrontFace",e[e.NONE=3]="NONE",e[e.COUNT=4]="COUNT"}(n||(n={}))},6360:function(e,t,r){var n;r.d(t,{r:function(){return n}}),function(e){e.POSITION="position",e.NORMAL="normal",e.NORMALCOMPRESSED="normalCompressed",e.UV0="uv0",e.AUXPOS1="auxpos1",e.AUXPOS2="auxpos2",e.COLOR="color",e.SYMBOLCOLOR="symbolColor",e.SIZE="size",e.TANGENT="tangent",e.OFFSET="offset",e.SUBDIVISIONFACTOR="subdivisionFactor",e.COLORFEATUREATTRIBUTE="colorFeatureAttribute",e.SIZEFEATUREATTRIBUTE="sizeFeatureAttribute",e.OPACITYFEATUREATTRIBUTE="opacityFeatureAttribute",e.DISTANCETOSTART="distanceToStart",e.UVMAPSPACE="uvMapSpace",e.BOUNDINGRECT="boundingRect",e.UVREGION="uvRegion",e.PROFILERIGHT="profileRight",e.PROFILEUP="profileUp",e.PROFILEVERTEXANDNORMAL="profileVertexAndNormal",e.FEATUREVALUE="featureValue",e.MODELORIGINHI="modelOriginHi",e.MODELORIGINLO="modelOriginLo",e.MODEL="model",e.MODELNORMAL="modelNormal",e.INSTANCECOLOR="instanceColor",e.INSTANCEFEATUREATTRIBUTE="instanceFeatureAttribute",e.LOCALTRANSFORM="localTransform",e.GLOBALTRANSFORM="globalTransform",e.BOUNDINGSPHERE="boundingSphere",e.MODELORIGIN="modelOrigin",e.MODELSCALEFACTORS="modelScaleFactors",e.FEATUREATTRIBUTE="featureAttribute",e.STATE="state",e.LODLEVEL="lodLevel",e.POSITION0="position0",e.POSITION1="position1",e.NORMALA="normalA",e.NORMALB="normalB",e.COMPONENTINDEX="componentIndex",e.VARIANTOFFSET="variantOffset",e.VARIANTSTROKE="variantStroke",e.VARIANTEXTENSION="variantExtension",e.U8PADDING="u8padding",e.U16PADDING="u16padding",e.SIDENESS="sideness",e.START="start",e.END="end",e.UP="up",e.EXTRUDE="extrude",e.OBJECTANDLAYERIDCOLOR="objectAndLayerIdColor",e.INSTANCEOBJECTANDLAYERIDCOLOR="instanceObjectAndLayerIdColor"}(n||(n={}))},78087:function(e,t,r){r.d(t,{Um:function(){return P},qu:function(){return R},Uy:function(){return _},MB:function(){return N},kE:function(){return I}});r(44114);var n=r(69292),i=r(26011),o=r(67886),a=r(456),s=r(32604),l=r(99484);r(79515);function c(e){return Math.abs(e*e*e)}function u(e,t,r){const n=r.parameters,i=r.paddingPixelsOverride;return m.scale=Math.min(n.divisor/(t-n.offset),1),m.factor=c(e),m.minPixelSize=n.minPixelSize,m.paddingPixels=i,m}function d(e,t){return 0===e?t.minPixelSize:t.minPixelSize*(1+2*t.paddingPixels/e)}function h(e,t){return Math.max((0,i.Cc)(e*t.scale,e,t.factor),d(e,t))}function f(e,t,r,n){return h(e,u(t,r,n))}(0,i.kU)(10),(0,i.kU)(12),(0,i.kU)(70),(0,i.kU)(40);const m={scale:0,factor:0,minPixelSize:0,paddingPixels:0};var p=r(28544),v=r(6360);const g=(0,s.vt)();function _(e,t,r,n,i,o){if(e.visible)if(e.boundingInfo){(0,p.vA)(e.type===l.X.Mesh);const a=t.tolerance;T(e.boundingInfo,r,n,a,i,o)}else{const t=e.indices.get(v.r.POSITION),a=e.vertexAttributes.get(v.r.POSITION);A(r,n,0,t.length/3,t,a,void 0,i,o)}}const x=(0,a.c)();function T(e,t,r,n,i,o){if(null==e)return;const a=E(t,r,x);if((0,s.Ne)(g,e.bbMin),(0,s.vI)(g,e.bbMax),null!=i&&i.applyToAabb(g),w(g,t,a,n)){const{primitiveIndices:a,indices:s,position:l}=e,c=a?a.length:s.length/3;if(c>H){const a=e.getChildren();if(void 0!==a){for(const e of a)T(e,t,r,n,i,o);return}}A(t,r,0,c,s,l,a,i,o)}}const b=(0,a.c)();function A(e,t,r,n,i,o,a,s,l){if(a)return S(e,t,r,n,i,o,a,s,l);const{data:c,stride:u}=o,d=e[0],h=e[1],f=e[2],m=t[0]-d,p=t[1]-h,v=t[2]-f;for(let g=r,_=3*r;g<n;++g){let e=u*i[_++],t=c[e++],r=c[e++],n=c[e];e=u*i[_++];let o=c[e++],a=c[e++],x=c[e];e=u*i[_++];let T=c[e++],A=c[e++],S=c[e];null!=s&&([t,r,n]=s.applyToVertex(t,r,n,g),[o,a,x]=s.applyToVertex(o,a,x,g),[T,A,S]=s.applyToVertex(T,A,S,g));const y=o-t,O=a-r,E=x-n,w=T-t,M=A-r,I=S-n,R=p*I-M*v,N=v*w-I*m,L=m*M-w*p,P=y*R+O*N+E*L;if(Math.abs(P)<=Number.EPSILON)continue;const H=d-t,D=h-r,F=f-n,V=H*R+D*N+F*L;if(P>0){if(V<0||V>P)continue}else if(V>0||V<P)continue;const B=D*E-O*F,z=F*y-E*H,U=H*O-y*D,W=m*B+p*z+v*U;if(P>0){if(W<0||V+W>P)continue}else if(W>0||V+W<P)continue;const G=(w*B+M*z+I*U)/P;G>=0&&l(G,C(y,O,E,w,M,I,b),g,!1)}}function S(e,t,r,n,i,o,a,s,l){const{data:c,stride:u}=o,d=e[0],h=e[1],f=e[2],m=t[0]-d,p=t[1]-h,v=t[2]-f;for(let g=r;g<n;++g){const e=a[g];let t=3*e,r=u*i[t++],n=c[r++],o=c[r++],_=c[r];r=u*i[t++];let x=c[r++],T=c[r++],A=c[r];r=u*i[t];let S=c[r++],y=c[r++],O=c[r];null!=s&&([n,o,_]=s.applyToVertex(n,o,_,g),[x,T,A]=s.applyToVertex(x,T,A,g),[S,y,O]=s.applyToVertex(S,y,O,g));const E=x-n,w=T-o,M=A-_,I=S-n,R=y-o,N=O-_,L=p*N-R*v,P=v*I-N*m,H=m*R-I*p,D=E*L+w*P+M*H;if(Math.abs(D)<=Number.EPSILON)continue;const F=d-n,V=h-o,B=f-_,z=F*L+V*P+B*H;if(D>0){if(z<0||z>D)continue}else if(z>0||z<D)continue;const U=V*M-w*B,W=B*E-M*F,G=F*w-E*V,k=m*U+p*W+v*G;if(D>0){if(k<0||z+k>D)continue}else if(k>0||z+k<D)continue;const $=(I*U+R*W+N*G)/D;$>=0&&l($,C(E,w,M,I,R,N,b),e,!1)}}const y=(0,a.c)(),O=(0,a.c)();function C(e,t,r,n,i,a,s){return(0,o.s)(y,e,t,r),(0,o.s)(O,n,i,a),(0,o.f)(s,y,O),(0,o.n)(s,s),s}function E(e,t,r){return(0,o.s)(r,1/(t[0]-e[0]),1/(t[1]-e[1]),1/(t[2]-e[2]))}function w(e,t,r,n){return M(e,t,r,n,1/0)}function M(e,t,r,n,i){const o=(e[0]-n-t[0])*r[0],a=(e[3]+n-t[0])*r[0];let s=Math.min(o,a),l=Math.max(o,a);const c=(e[1]-n-t[1])*r[1],u=(e[4]+n-t[1])*r[1];if(l=Math.min(l,Math.max(c,u)),l<0)return!1;if(s=Math.max(s,Math.min(c,u)),s>l)return!1;const d=(e[2]-n-t[2])*r[2],h=(e[5]+n-t[2])*r[2];return l=Math.min(l,Math.max(d,h)),!(l<0)&&(s=Math.max(s,Math.min(d,h)),!(s>l)&&s<i)}function I(e,t,r,n,o){let a=(r.screenLength||0)*e.pixelRatio;null!=o&&(a=f(a,n,t,o));const s=a*Math.tan(.5*e.fovY)/(.5*e.fullHeight);return(0,i.qE)(s*t,r.minWorldLength||0,null!=r.maxWorldLength?r.maxWorldLength:1/0)}function R(e,t){const r=t?R(t):{};for(const n in e){let t=e[n];t&&t.forEach&&(t=L(t)),null==t&&n in r||(r[n]=t)}return r}function N(e,t){let r=!1;for(const i in t){const o=t[i];void 0!==o&&(Array.isArray(o)?null===e[i]?(e[i]=o.slice(),r=!0):(0,n.yo)(e[i],o)&&(r=!0):e[i]!==o&&(r=!0,e[i]=o))}return r}function L(e){const t=[];return e.forEach((e=>t.push(e))),t}const P={multiply:1,ignore:2,replace:3,tint:4},H=1e3},28018:function(e,t,r){r.d(t,{_:function(){return n}});class n{constructor(e,t,r,n,i,o=!1,a=0){this.name=e,this.count=t,this.type=r,this.offset=n,this.stride=i,this.normalized=o,this.divisor=a}}},10645:function(e,t,r){r.d(t,{Zo:function(){return i},jA:function(){return o},jS:function(){return n}});r(16573),r(78100),r(77936),r(37467),r(44732),r(79577);function n(e,t,r){for(let n=0;n<r;++n)t[2*n]=e[n],t[2*n+1]=e[n]-t[2*n]}function i(e,t){const r=e.length;for(let n=0;n<r;++n)a[0]=e[n],t[n]=a[0];return t}function o(e,t){const r=e.length;for(let n=0;n<r;++n)a[0]=e[n],a[1]=e[n]-a[0],t[n]=a[1];return t}const a=new Float32Array(2)},46896:function(e,t,r){r.d(t,{Ey:function(){return T},Ms:function(){return U},Xt:function(){return c},kn:function(){return u},ox:function(){return o},p3:function(){return a},wE:function(){return d}});var n=r(78964),i=r(73719);function o(e,t,r=i.Tb.ADD,n=[0,0,0,0]){return{srcRgb:e,srcAlpha:e,dstRgb:t,dstAlpha:t,opRgb:r,opAlpha:r,color:{r:n[0],g:n[1],b:n[2],a:n[3]}}}function a(e,t,r,n,o=i.Tb.ADD,a=i.Tb.ADD,s=[0,0,0,0]){return{srcRgb:e,srcAlpha:t,dstRgb:r,dstAlpha:n,opRgb:o,opAlpha:a,color:{r:s[0],g:s[1],b:s[2],a:s[3]}}}const s={face:i.Y7.BACK,mode:i.Ac.CCW},l={face:i.Y7.FRONT,mode:i.Ac.CCW},c=e=>e===n.s2.Back?s:e===n.s2.Front?l:null,u={zNear:0,zFar:1},d={r:!0,g:!0,b:!0,a:!0};function h(e){return S.intern(e)}function f(e){return O.intern(e)}function m(e){return E.intern(e)}function p(e){return M.intern(e)}function v(e){return R.intern(e)}function g(e){return L.intern(e)}function _(e){return H.intern(e)}function x(e){return F.intern(e)}function T(e){return B.intern(e)}class b{constructor(e,t){this._makeKey=e,this._makeRef=t,this._interns=new Map}intern(e){if(!e)return null;const t=this._makeKey(e),r=this._interns;return r.has(t)||r.set(t,this._makeRef(e)),r.get(t)??null}}function A(e){return"["+e.join(",")+"]"}const S=new b(y,(e=>({__tag:"Blending",...e})));function y(e){return e?A([e.srcRgb,e.srcAlpha,e.dstRgb,e.dstAlpha,e.opRgb,e.opAlpha,e.color.r,e.color.g,e.color.b,e.color.a]):null}const O=new b(C,(e=>({__tag:"Culling",...e})));function C(e){return e?A([e.face,e.mode]):null}const E=new b(w,(e=>({__tag:"PolygonOffset",...e})));function w(e){return e?A([e.factor,e.units]):null}const M=new b(I,(e=>({__tag:"DepthTest",...e})));function I(e){return e?A([e.func]):null}const R=new b(N,(e=>({__tag:"StencilTest",...e})));function N(e){return e?A([e.function.func,e.function.ref,e.function.mask,e.operation.fail,e.operation.zFail,e.operation.zPass]):null}const L=new b(P,(e=>({__tag:"DepthWrite",...e})));function P(e){return e?A([e.zNear,e.zFar]):null}const H=new b(D,(e=>({__tag:"ColorWrite",...e})));function D(e){return e?A([e.r,e.g,e.b,e.a]):null}const F=new b(V,(e=>({__tag:"StencilWrite",...e})));function V(e){return e?A([e.mask]):null}const B=new b(z,(e=>({blending:h(e.blending),culling:f(e.culling),polygonOffset:m(e.polygonOffset),depthTest:p(e.depthTest),stencilTest:v(e.stencilTest),depthWrite:g(e.depthWrite),colorWrite:_(e.colorWrite),stencilWrite:x(e.stencilWrite)})));function z(e){return e?A([y(e.blending),C(e.culling),w(e.polygonOffset),I(e.depthTest),N(e.stencilTest),P(e.depthWrite),D(e.colorWrite),V(e.stencilWrite)]):null}class U{constructor(e){this._pipelineInvalid=!0,this._blendingInvalid=!0,this._cullingInvalid=!0,this._polygonOffsetInvalid=!0,this._depthTestInvalid=!0,this._stencilTestInvalid=!0,this._depthWriteInvalid=!0,this._colorWriteInvalid=!0,this._stencilWriteInvalid=!0,this._stateSetters=e}setPipeline(e){(this._pipelineInvalid||e!==this._pipeline)&&(this._setBlending(e.blending),this._setCulling(e.culling),this._setPolygonOffset(e.polygonOffset),this._setDepthTest(e.depthTest),this._setStencilTest(e.stencilTest),this._setDepthWrite(e.depthWrite),this._setColorWrite(e.colorWrite),this._setStencilWrite(e.stencilWrite),this._pipeline=e),this._pipelineInvalid=!1}invalidateBlending(){this._blendingInvalid=!0,this._pipelineInvalid=!0}invalidateCulling(){this._cullingInvalid=!0,this._pipelineInvalid=!0}invalidatePolygonOffset(){this._polygonOffsetInvalid=!0,this._pipelineInvalid=!0}invalidateDepthTest(){this._depthTestInvalid=!0,this._pipelineInvalid=!0}invalidateStencilTest(){this._stencilTestInvalid=!0,this._pipelineInvalid=!0}invalidateDepthWrite(){this._depthWriteInvalid=!0,this._pipelineInvalid=!0}invalidateColorWrite(){this._colorWriteInvalid=!0,this._pipelineInvalid=!0}invalidateStencilWrite(){this._stencilTestInvalid=!0,this._pipelineInvalid=!0}_setBlending(e){this._blending=this._setSubState(e,this._blending,this._blendingInvalid,this._stateSetters.setBlending),this._blendingInvalid=!1}_setCulling(e){this._culling=this._setSubState(e,this._culling,this._cullingInvalid,this._stateSetters.setCulling),this._cullingInvalid=!1}_setPolygonOffset(e){this._polygonOffset=this._setSubState(e,this._polygonOffset,this._polygonOffsetInvalid,this._stateSetters.setPolygonOffset),this._polygonOffsetInvalid=!1}_setDepthTest(e){this._depthTest=this._setSubState(e,this._depthTest,this._depthTestInvalid,this._stateSetters.setDepthTest),this._depthTestInvalid=!1}_setStencilTest(e){this._stencilTest=this._setSubState(e,this._stencilTest,this._stencilTestInvalid,this._stateSetters.setStencilTest),this._stencilTestInvalid=!1}_setDepthWrite(e){this._depthWrite=this._setSubState(e,this._depthWrite,this._depthWriteInvalid,this._stateSetters.setDepthWrite),this._depthWriteInvalid=!1}_setColorWrite(e){this._colorWrite=this._setSubState(e,this._colorWrite,this._colorWriteInvalid,this._stateSetters.setColorWrite),this._colorWriteInvalid=!1}_setStencilWrite(e){this._stencilWrite=this._setSubState(e,this._stencilWrite,this._stencilWriteInvalid,this._stateSetters.setStencilWrite),this._stencilTestInvalid=!1}_setSubState(e,t,r,n){return(r||e!==t)&&(n(e),this._pipelineInvalid=!0),e}}}}]);
//# sourceMappingURL=4822.7e11a0c8.js.map