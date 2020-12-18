describe('Layers', function () {
  describe('Base', function () {
    let layer

    beforeEach(function () {
      layer = new vd.layer.Base(0, 4)
    })

    it("should be of type 'layer'", function () {
      expect(layer.type).toBe('layer')
    })

    it('should attach to movie', function () {
      const movie = {}
      // Simulate attach to movie
      layer.attach(movie)
      expect(layer._movie).toEqual(movie)
    })

    it('should propogate changes up', function () {
      // Connect to movie to publish event to
      const movie = {}
      layer.attach(movie)

      // Listen for event called on moive
      let timesFired = 0
      vd.event.subscribe(movie, 'movie.change.layer', () => {
        timesFired++
      })
      // Modify layer
      layer.startTime = 1
      expect(timesFired).toBe(1)
    })
  })

  describe('Visual', function () {
    let layer

    beforeEach(function () {
      layer = new vd.layer.Visual(0, 4, { background: 'blue' })
      layer.attach(
        { width: 400, height: 400, currentTime: 0, movie: {}, propertyFilters: {} }
      )
      layer.render(0)
    })

    it('should render the background', function () {
      const imageData = layer.vctx.getImageData(0, 0, 400, 400)
      let allBlue = true
      for (let i = 0; i < imageData.data.length; i += 4) {
        allBlue = allBlue &&
          imageData.data[i + 0] === 0 &&
          imageData.data[i + 1] === 0 &&
          imageData.data[i + 2] === 255 &&
          imageData.data[i + 3] === 255
      }
      expect(allBlue).toBe(true)
    })
  })

  describe('Image', function () {
    let layer

    beforeEach(function (done) {
      const image = new Image()
      image.src = '/base/spec/assets/layer/image.jpg'
      image.onload = () => {
        layer = new vd.layer.Image(0, 4, image)
        // Simulate attach to movie
        layer.attach(
          { width: image.width, height: image.height, currentTime: 0 }
        )
        done()
      }
    })

    it('should render', function () {
      // Render layer (actual outcome)
      layer.render(0)
      const imageData = layer.vctx.getImageData(0, 0, layer.width, layer.height)

      // Draw image (expected outcome)
      const testCanv = document.createElement('canvas')
      testCanv.width = layer.width
      testCanv.height = layer.height
      const testCtx = testCanv.getContext('2d')
      testCtx.drawImage(layer.image, 0, 0, layer.width, layer.height)
      const testImageData = testCtx.getImageData(0, 0, layer.width, layer.height)

      // Compare expected outcome with actual outcome
      let equal = true
      for (let i = 0; i < imageData.data.length; i++) {
        equal = equal && imageData.data[i] === testImageData.data[i]
      }
      expect(equal).toBe(true)
    })
  })

  describe('Media', function () {
    let layer
    // Media is an abstract mixin, so make a concrete subclass here.
    const CustomMedia = vd.layer.MediaMixin(vd.layer.Base)
    const source = new Audio()

    beforeAll(function (done) {
      source.addEventListener('canplay', done)
      source.src = '/base/spec/assets/layer/audio.wav'
    })

    beforeEach(function () {
      layer = new CustomMedia(0, source)
    })

    it('should have its duration depend on its playbackRate', function () {
      const oldDuration = layer.duration
      layer.playbackRate = 2
      expect(layer.duration).toBe(oldDuration / 2)
    })
  })

  // I suspect this doesn't work becuase of autoplay restrictions
  /* describe('Audio', function () {
    let layer

    beforeEach(function (done) {
      const audio = new Audio()
      audio.src = '/base/spec/assets/layer/audio.wav'
      // audio.muted = true // until we figure out how to allow autoplay in headless chrome
      audio.addEventListener('loadedmetadata', () => {
        layer = new vd.layer.Audio(0, audio)
        layer.attach(
          { actx: new AudioContext(), currentTime: 0 }
        )
        done()
      })
    })

    it('should play', function () {
      let timesPlayed = 0
      layer.media.addEventListener('play', () => {
        timesPlayed++
      })
      for (let i = 0; i < 3; i++) {
        layer.start(0) // reltime = 0s
        layer.stop(0) // reltime = 0s
      }
      expect(timesPlayed).toBe(3)
    })
  }) */
})
