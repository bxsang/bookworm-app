import React from 'react'
import { Container } from 'react-bootstrap'

const About = () => (
  <Container>
    <h2>About Us</h2>
    <hr />
    <div class="d-flex justify-content-center">
      <h1><strong>Welcome to Bookworm</strong></h1>
      <h5>"Bookworm is an independent New York bookstore and language school with locations in Manhattan and Brooklyn. We specialize in travel books and language classes."</h5>
    </div>

    <div class="row mt-4">
      <div class="col-sm-6 col-md-6 col-lg-6">
        <h2><strong>Our Story</strong></h2>
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id tristique magna, ut vestibulum ligula. Donec sit amet condimentum ipsum. Nulla facilisi. Etiam ut rutrum nulla, non euismod nibh. Vivamus sed sagittis purus, vitae imperdiet sapien. In tempus metus a scelerisque semper. Sed ligula lorem, egestas eu vestibulum non, imperdiet eget ligula. Duis lobortis elit ligula, a molestie purus consequat quis. Ut a felis accumsan, imperdiet nisl ac, convallis risus. Vivamus rhoncus tincidunt ornare. Donec tempor justo tellus, nec ullamcorper mi egestas sed. Nulla efficitur accumsan magna, et mollis elit ultricies eu. Donec sem quam, sodales at massa eget, tincidunt posuere risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec iaculis vehicula orci ac consectetur. Cras eget urna vitae arcu commodo dictum. </p>
      </div>
      <div class="col-sm-6 col-md-6 col-lg-6">
      <h2><strong>Our Vision</strong></h2>
      <p>In sit amet gravida ligula, ut interdum sem. Suspendisse velit risus, rhoncus quis tellus id, tincidunt placerat felis. Phasellus accumsan metus vel vestibulum sagittis. Sed varius eu felis at congue. Vivamus pellentesque nisi ac orci ultrices cursus. Vivamus elit nisi, commodo sit amet venenatis ac, faucibus ut arcu. Nullam suscipit dolor eget tellus pulvinar, id commodo erat dignissim. Nam ornare pellentesque purus nec volutpat. Pellentesque eros augue, posuere non metus quis, dignissim vehicula enim. Mauris libero elit, semper quis euismod a, commodo ut nulla. Integer volutpat nisl velit, id consectetur libero vehicula et. </p>
      </div>
    </div>
  </Container>
)

export default About
