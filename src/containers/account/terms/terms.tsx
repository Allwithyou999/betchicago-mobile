import * as React from 'react'
import { Platform, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { NavigationScreenProps, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Icon, TopNavigation, AsyncImage } from '../../../components'
import { Colors } from '../../../themes'
import * as screenStyles from './terms.styles'

export interface SavedStoriesScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  dispatch?: () => void
}

export interface SavedStoriesScreenState {
  isBusy: boolean
  type: string
}

class SavedStoriesScreen extends React.Component<SavedStoriesScreenProps, SavedStoriesScreenState> {
  constructor(props) {
    super(props)
    this.state = {
      isBusy: false,
      type: this.props.navigation.state.params['type'],
    }
  }

  onBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    const { type } = this.state

    return (
      <View style={screenStyles.ROOT}>
        <View>{Platform.OS === 'ios' && <View style={screenStyles.statusBar} />}</View>
        <TopNavigation title={type} onPress={this.onBack} />
        <ScrollView>
          <View style={screenStyles.scrollContents}>
            {type === 'Terms' && (
              <View>
                <Text style={screenStyles.pageSubject}>Terms of Use</Text>
                <Text style={screenStyles.pageDesc}>
                  These Terms of Use (“Terms“) govern your access to and use of our (BetChicago’s) website, products,
                  and services (“Products“). Please read these Terms carefully. By accessing or using our Products, you
                  agree to be bound by these Terms and by our Privacy Policy.
                </Text>
                <Text style={screenStyles.boldText}>USING BET CHICAGO</Text>
                <Text style={screenStyles.boldSmallText}>Who can use BetChicago</Text>
                <Text style={screenStyles.pageDesc}>
                  You may use our Products only if you can form a binding contract with BetChicago, and only in
                  compliance with these Terms and all applicable laws. When you sign up with BetChicago, you must
                  provide us with accurate and complete information. Any use or access by anyone under the age of 13 is
                  prohibited. If you open an account on behalf of a company, organization, or other entity, then (a)
                  “you” includes you and that entity, and (b) you represent and warrant that you are authorized to grant
                  all permissions and licenses provided in these Terms and bind the entity to these Terms, and that you
                  agree to these Terms on the entity’s behalf. Some of our Products may be software that is downloaded
                  to your computer, phone, tablet, or other device. You agree that we may automatically upgrade those
                  Products, and these Terms will apply to such upgrades.
                </Text>
                <Text style={screenStyles.boldSmallText}>Our license to you</Text>
                <Text style={screenStyles.pageDesc}>
                  Subject to these Terms and our policies, we grant you a limited, non-exclusive, non-transferable, and
                  revocable license to use our Products.
                </Text>
                <Text style={screenStyles.boldText}>YOUR CONTENT</Text>
                <Text style={screenStyles.boldSmallText}>Posting contento</Text>
                <Text style={screenStyles.pageDesc}>
                  BetChicago allows you to post content, including photos, comments, links, and other materials.
                  Anything that you post or otherwise make available on our Products is referred to as “User Content.”
                  You retain all applicable ownership rights in, and are solely responsible for, the User Content you
                  post to BetChicago.
                </Text>
                <Text style={screenStyles.boldSmallText}>How BetChicago and other users can use your content</Text>
                <Text style={screenStyles.pageDesc}>
                  You grant BetChicago, its users, and its third party affiliates and business partners a non-exclusive,
                  royalty-free, transferable, sublicensable, worldwide license to use, store, display, reproduce,
                  modify, create derivative works, perform, sublicense and distribute your User Content on BetChicago
                  solely for the purposes of operating, developing, providing, and using the BetChicago Products.
                  Nothing in these Terms shall restrict other legal rights BetChicago may have to User Content, for
                  example, under other licenses. We reserve the right to remove or modify User Content for any reason,
                  including User Content that we believe violates these Terms or our policies.
                </Text>
                <Text style={screenStyles.boldSmallText}>How long we keep your content</Text>
                <Text style={screenStyles.pageDesc}>
                  Following termination or deactivation of your account, or if you remove any User Content from
                  BetChicago, we may retain your User Content for backup, archival, or audit purposes. Furthermore,
                  BetChicago and its users may retain and continue to use, store, display, reproduce, modify, create
                  derivative works, perform, sublicense and distribute any of your User Content that other users have
                  stored, paired with other items, or shared through BetChicago.
                </Text>
                <Text style={screenStyles.boldSmallText}>Feedback you provide</Text>
                <Text style={screenStyles.pageDesc}>
                  We value hearing from our users and are always interested in learning about ways we can make
                  BetChicago better. If you choose to submit comments, ideas, or feedback (collectively, “Feedback”),
                  you agree that we are free to use such Feedback without any restriction or compensation to you. You
                  hereby assign all right, title and interest in such Feedback to BetChicago. By accepting your
                  Feedback, BetChicago does not waive any rights to use similar or related Feedback previously known to
                  BetChicago, or developed by its employees, or obtained from sources other than you.
                </Text>
                <Text style={screenStyles.boldText}>COPYRIGHT POLICY</Text>
                <Text style={screenStyles.pageDesc}>
                  BetChicago has adopted and implemented the BetChicago Copyright Policy in accordance with the Digital
                  Millennium Copyright Act. For more information, please read our Copyright Policy.
                </Text>
                <Text style={screenStyles.boldText}>SECURITY</Text>
                <Text style={screenStyles.pageDesc}>
                  We care about the security of our users. While we work to protect the security of your content and
                  account, BetChicago cannot guarantee that unauthorized third parties will not be able to defeat our
                  security measures. Please notify us immediately of any compromised or unauthorized use of your
                  account.
                </Text>
                <Text style={screenStyles.boldText}>THIRD-PARTY LINKS, SITES, AND SERVICES</Text>
                <Text style={screenStyles.pageDesc}>
                  Our Products may contain links to third-party websites, advertisers, services, special offers, or
                  other events or activities that are not owned or controlled by BetChicago. We do not endorse or assume
                  any responsibility for any such third-party sites, information, materials, products, or services. If
                  you access any third party website, service, or content from BetChicago, you do so at your own risk
                  and you agree that BetChicago will have no liability arising from your use of or access to any
                  third-party website, service, or content.
                </Text>
                <Text style={screenStyles.boldText}>TERMINATION</Text>
                <Text style={screenStyles.pageDesc}>
                  BetChicago may terminate or suspend this license at any time, with or without cause or notice to you.
                  Upon termination, you continue to be bound by these Terms.
                </Text>
                <Text style={screenStyles.boldText}>INDEMNITY</Text>
                <Text style={screenStyles.pageDesc}>
                  If you use our Products in violation of these Terms, you agree to indemnify and hold harmless
                  BetChicago and its officers, directors, employees and agents, from and against any claims, suits,
                  proceedings, disputes, demands, liabilities, damages, losses, costs and expenses, including, without
                  limitation, reasonable legal and accounting fees (including costs of defense of claims, suits or
                  proceedings brought by third parties), in any way related to (a) your access to or use of our
                  Products, (b) your User Content, or (c) your breach of any of these Terms.
                </Text>
                <Text style={screenStyles.boldText}>DISCLAIMERS</Text>
                <Text style={screenStyles.pageDesc}>
                  The Products and all included content are provided on an “as is” basis without warranty of any kind,
                  whether express or implied.
                  {'\n\n'}
                  BetChicago SPECIFICALLY DISCLAIMS ANY AND ALL WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS
                  FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR
                  USAGE OF TRADE.
                  {'\n\n'}
                  BetChicago takes no responsibility and assumes no liability for any User Content that you or any other
                  user or third party posts or transmits using our Products. You understand and agree that you may be
                  exposed to User Content that is inaccurate, objectionable, inappropriate for children, or otherwise
                  unsuited to your purpose.
                </Text>
                <Text style={screenStyles.boldText}>LIMITATION ON LIABILITY</Text>
                <Text style={screenStyles.pageDesc}>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, BETCHICAGO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                  SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
                  DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOOD-WILL, OR OTHER INTANGIBLE LOSSES, RESULTING
                  FROM (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE PRODUCTS; (B) ANY CONDUCT OR
                  CONTENT OF ANY THIRD PARTY ON THE PRODUCTS, INCLUDING WITHOUT LIMITATION, ANY DEFAMATORY, OFFENSIVE OR
                  ILLEGAL CONDUCT OF OTHER USERS OR THIRD PARTIES; OR (C) UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR
                  TRANSMISSIONS OR CONTENT. IN NO EVENT SHALL BETCHICAGO’S AGGREGATE LIABILITY FOR ALL CLAIMS RELATING
                  TO THE PRODUCTS EXCEED ONE HUNDRED U.S. DOLLARS (U.S. $100.00).
                </Text>
                <Text style={screenStyles.boldText}>ARBITRATION</Text>
                <Text style={screenStyles.pageDesc}>
                  For any dispute you have with BetChicago, you agree to first contact us and attempt to resolve the
                  dispute with us informally. If BetChicago cannot resolve the dispute with you informally, we each
                  agree to resolve any claim, dispute, or controversy (excluding claims for injunctive or other
                  equitable relief) arising out of or in connection with or relating to these Terms by binding
                  arbitration by the American Arbitration Association (“AAA“) under the Commercial Arbitration Rules and
                  Supplementary Procedures for Consumer Related Disputes then in effect for the AAA, except as provided
                  herein. Unless you and BetChicago agree otherwise, the arbitration will be conducted in the county of
                  Cook County, Illinois. Each party will be responsible for paying any AAA filing, administrative and
                  arbitrator fees in accordance with AAA rules; except that BetChicago will advance your reasonable
                  filing, administrative, and arbitrator fees if your claim for damages does not exceed $75,000 and is
                  non-frivolous (as measured by the standards set forth in Federal Rule of Civil Procedure 11(b)). The
                  award rendered by the arbitrator shall include costs of arbitration, reasonable attorneys’ fees and
                  reasonable costs for expert and other witnesses, and any judgment on the award rendered by the
                  arbitrator may be entered in or confirmed by any court of competent jurisdiction. Nothing in this
                  Section shall prevent either party from seeking injunctive or other equitable relief from the courts
                  for matters related to data security, intellectual property, or unauthorized access to the Service.
                  ALL CLAIMS MUST BE BROUGHT IN THE PARTIES’ INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER
                  IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING, AND, UNLESS WE AGREE OTHERWISE, THE ARBITRATOR
                  MAY NOT CONSOLIDATE MORE THAN ONE PERSON’S CLAIMS. YOU AGREE THAT, BY ENTERING INTO THESE TERMS, YOU
                  AND BetChicago ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION.
                </Text>
                <Text style={screenStyles.boldText}>GOVERNING LAW AND JURISDICTION</Text>
                <Text style={screenStyles.pageDesc}>
                  These Terms shall be governed by the laws of the State of Illinios, without respect to its conflict of
                  laws principles. We each agree to submit to the personal jurisdiction of a state court located in Cook
                  County, Illinois, or the United States District Court for the Northern District of Illinois, Eastern
                  Division, for any actions not subject to arbitration, as outlined above.
                  {'\n\n'}
                  Our Products are controlled and operated from the United States, and we make no representations that
                  they are appropriate or available for use in other locations.
                </Text>
                <Text style={screenStyles.boldText}>GENERAL TERMS</Text>
                <Text style={screenStyles.boldSmallText}>Notification Procedures and changes to these Terms</Text>
                <Text style={screenStyles.pageDesc}>
                  BetChicago reserves the right to determine the form and means of providing notifications to you, and
                  you agree to receive legal notices electronically if we so choose. We may revise these Terms from time
                  to time and the most current version will always be posted on our website. If a revision, in our sole
                  discretion, is material we will notify you. By continuing to access or use the Products after
                  revisions become effective, you agree to be bound by the revised Terms. If you do not agree to the new
                  terms, please stop using the Products.
                </Text>
                <Text style={screenStyles.boldSmallText}>Assignment</Text>
                <Text style={screenStyles.pageDesc}>
                  These Terms, and any rights and licenses granted hereunder, may not be transferred or assigned by you,
                  but may be assigned by BetChicago without restriction. Any attempted transfer or assignment in
                  violation hereof shall be null and void.
                </Text>
                <Text style={screenStyles.boldSmallText}>Entire Agreement/Severability</Text>
                <Text style={screenStyles.pageDesc}>
                  These Terms, together with the Privacy Policy and other policies referenced herein or pinned hereto
                  and any amendments and any additional agreements you may enter into with BetChicago in connection with
                  the Products, shall constitute the entire agreement between you and BetChicago concerning the
                  Products. If any provision of these Terms is deemed invalid, then that provision will be limited or
                  eliminated to the minimum extent necessary, and the remaining provisions of these Terms will remain in
                  full force and effect.
                </Text>
                <Text style={screenStyles.boldSmallText}>No Waiver</Text>
                <Text style={screenStyles.pageDesc}>
                  No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or
                  any other term, and BetChicago’s failure to assert any right or provision under these Terms shall not
                  constitute a waiver of such right or provision.
                </Text>
              </View>
            )}
            {type === 'Privacy' && (
              <View>
                <Text style={screenStyles.pageSubject}>Privacy Policy</Text>
                <Text style={screenStyles.pageDesc}>
                  We’re excited to have you in the BetChicago community! We understand that your information and privacy
                  are important to you, so we’ve written this policy to help you understand what information we collect,
                  how we use that information and what choices you have in regards to that information.
                </Text>
                <Text style={screenStyles.boldText}>What information we collect</Text>
                <Text style={screenStyles.boldSmallText}>Information you provide or give us permission to obtain</Text>
                <Text style={screenStyles.pageDesc}>
                  When you sign up for our products, you voluntarily provide certain information. This can include your
                  name, phone number, the email address you used to sign up, along with other optional demographic
                  information related to your account.
                  {`\n\n`}
                  As you use our products, you may provide BetChicago with information on favorite teams, favorite
                  players and other topics of interest. BetChicago stores this information, as well as information on
                  certain usage activity, including the articles you read, the games you’re interested in, contests you
                  register for and/or participate in, general browsing activities and other information.
                  {`\n\n`}
                  You may also give us permission to access your information in other services. For example, you may
                  link your Facebook account to BetChicago which allows us to obtain information from your account (like
                  your friends). The information we obtain from those services is generally governed by your settings or
                  the privacy policy of that particular service, so be sure to check with each provider if you choose to
                  connect your account.
                </Text>
                <Text style={screenStyles.boldSmallText}>Technical information</Text>
                <Text style={screenStyles.pageDesc}>
                  As with almost every website, mobile application or other internet-based service, there’s certain
                  information that gets created and recorded automatically. This is true of our products as well. Here
                  are some types of information we collect:
                  {'\n\n'}
                  Log data. When you use BetChicago, our servers automatically record information (“log data”),
                  including information that your browser sends whenever you visit a website or your mobile app sends
                  when you’re using it. This log data may include your Internet Protocol (IP) address, browser type and
                  settings, the date and time of your request and cookie data.
                  {'\n\n'}
                  Cookies. Depending on how you access our products, we may use cookies or similar technologies to
                  record log data and other information to help us provide a better user experience. We may use
                  “session” cookies (removed when you close your browser) or “persistent” cookies (these remain on your
                  device until you or your browser removes them). For instance, we may use cookies to remember your
                  settings so you don’t have to set them up at each visit.
                  {'\n\n'}
                  Device information. In addition to log data, we may also collect information about the device you’re
                  using BetChicago on, including what type of device it is, what operating system you’re using, device
                  settings and other information depending on what the device provides.
                  {'\n\n'}
                  Pixel Tags. In order to collect usage data, we may use “pixel tags”, “web beacons”, “clear gifs” or
                  similar technologies in connection with emails we send to our users. Our use of these technologies
                  allows us to count users who have visited certain pages on our website, to deliver branded services
                  and to help determine the effectiveness of communication campaigns.
                </Text>
                <Text style={screenStyles.boldText}>How We Use This Information</Text>
                <Text style={screenStyles.pageDesc}>
                  We use the information we collect to provide our products to you, to make them better, to improve
                  performance, to develop and deliver new products or services and to protect BetChicago and our
                  community of users.
                  {'\n\n'}
                  We also use the information we collect to deliver customized content. As you provide more information
                  on your interests, favorite teams, favorite players and other information, we will compile and analyze
                  that information to deliver content and information that may be of interest to you.
                </Text>
                <Text style={screenStyles.boldSmallText}>We also use the information we collect to:</Text>
                <Text style={screenStyles.pageDesc}>
                  ● Send product updates, newsletters, marketing materials and other information that may be of interest
                  to you. For example, depending on your settings, you may receive emails when new contests and/or
                  instructional videos are available.
                  {'\n\n'}● Send activity notifications. For examples, depending on your settings, you may receive email
                  when a new contest is scheduled or about to begin or when someone responds to comments made within the
                  community.
                  {'\n\n'}● Respond to your feedback, questions or comments.
                  {'\n\n\n'}
                  The information we collect may be personally identifiable (for example, your email address or name) or
                  “non-personally identifiable” (for example a link share or comment). We collect and use both types of
                  information, and combinations of both, as described above. We may use or store information wherever
                  BetChicago does business including countries outside your own.
                </Text>
                <Text style={screenStyles.boldText}>Your Access and Control Over Information</Text>
                <Text style={screenStyles.pageDesc}>
                  Once you have registered for your Bet Chicago account, you may manage your information through the
                  account settings page. For example you can:
                  {'\n\n\n'}● Access and change information on your user profile at any time. This includes your name,
                  username and notification settings.
                  {'\n\n'}● Update the email address used during registration as well as opt out or opt in to receive
                  different newsletter and email-based information (for example, new feature alerts).
                  {'\n\n'}● Link or unlink your BetChicago account from other services (for example, facebook or
                  twitter).
                  {'\n\n'}● Close your account at any time. When you close your account, we will deactivate the account
                  and your account will not longer will available. We may retain archived copies of your information as
                  required by law or for legitimate business purposes.
                </Text>
                <Text style={screenStyles.boldText}>Our policy on children’s information</Text>
                <Text style={screenStyles.pageDesc}>
                  We comply with the Children’s Online Privacy Protection Act, which requires us to notify and obtain
                  consent from a parent or guardian before we collect, use or disclose personal information of anyone
                  under 13 years of age.
                  {'\n\n'}
                  If you learn that your minor child has provided us with personal information without your consent,
                  please contact us.
                </Text>
                <Text style={screenStyles.boldText}>How We Share Information</Text>
                <Text style={screenStyles.pageDesc}>
                  BetChicago provides high value, original sports content, game coverage, stats and the latest odds for
                  major sports in Chicago and around the world. We also offer free to play, sports-related contests to
                  win cash and prizes.
                </Text>
                <Text style={screenStyles.boldSmallText}>Personally Identifiable Information</Text>
                <Text style={screenStyles.pageDesc}>
                  Your username, name and profile photo are visible to registered users to allow others to discover you
                  within the application. Your email address or phone number provided for registration will NOT be
                  shared with friends or users. There otherlimited instances where we may share personal information
                  include:
                  {'\n\n'}● When you choose to share our content, or your activities with other services (like Facebook,
                  Twitter, Instagram) when you have linked them to your BetChicago account.
                  {'\n\n'}● Like many businesses, from time to time, we may engage or hire other companies to perform
                  certain business-related functions (database maintenance, security audit, fraud monitoring, etc). When
                  we employ another company to perform a function of this nature, we provide information only required
                  to perform their specific function.
                  {'\n\n'}● As we evolve our business, we may engage in merger, acquisition, bankruptcy, dissolution or
                  similar transactions which require the transfer of information described in this policy.
                  {'\n\n'}● If we believe that disclosure is reasonably necessary to comply with law, regulation or
                  legal request; to protect the safety, rights or property of the public, any person or BetChicago; or
                  to detect, prevent or otherwise address fraud, security or technical issues.
                </Text>
                <Text style={screenStyles.boldSmallText}>Non-Personally Identifiable and Aggregate Data</Text>
                <Text style={screenStyles.pageDesc}>
                  In our effort to better understand and deliver solutions to our users, BetChicago may conduct research
                  on its customer demographics, team preferences, player preferences and behaviors based on information
                  provided to us. This research may be compiled and analyzed on an aggregate basis.
                  {'\n\n'}
                  BetChicago may share this non-identifiable and aggregate data with its affiliates, agents and business
                  partners. This type of information does not identify you personally. BetChicago may also disclose
                  aggregated user statistics in order to describe our products to current and prospective business
                  partners, and to other third parties for other business related purposes.
                </Text>
                <Text style={screenStyles.boldText}>Security</Text>
                <Text style={screenStyles.pageDesc}>
                  We have agreements with third parties and have adopted other security measures to protect against the
                  loss, misuse and/or unauthorized alteration of the information under our control or under the control
                  of our service providers. Although we use industry standard practices to protect your privacy, we do
                  not promise, and you should not expect, that your personal information or private communications will
                  always remain free from security issues.
                  {'\n\n'}
                  If a security security breach involving your personal information occurs, we will notify you as
                  quickly as possible and consistent with the legitimate interests of law enforcement, or any measures
                  necessary to determine the scope of the breach and restore the reasonable integrity to our systems.
                </Text>
                <Text style={screenStyles.boldText}>Making Changes to the Policy</Text>
                <Text style={screenStyles.pageDesc}>
                  We may change this policy from time to time and any changes to the policy will be posted to this page.
                  By continuing to use BetChicago products after those changes are in effect, you agree to the revised
                  policy. Should significant changes occur, we may provide more prominent notice or ask for you content
                  as required by law.
                </Text>
                <Text style={screenStyles.boldText}>Other Terms</Text>
                <Text style={screenStyles.pageDesc}>
                  Your access to and use of BetChicago products is subject to our Terms of Service.
                </Text>
              </View>
            )}
            {type === 'Copyright' && (
              <View>
                <Text style={screenStyles.pageSubject}>Copyright Information</Text>
                <Text style={screenStyles.pageDesc}>© 2018-2019. Illinois Sports Gaming, LLC.</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  status: state.app.status,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedStoriesScreen)
