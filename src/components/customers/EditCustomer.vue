<template>
  <div>
    <modal-window
        deleteButton
        @close="$emit('input', false)"
        @delete-product="confirmDelete=true"
        @btn-click="saveChanges"
        :value="value">
      <template #title>
        Customer Profile
      </template>
      <template #default>
        <div class="main-block">
          <div class="info">
            <div class="info-row">
              <InputWithLabel
                  title="First Name"
                  v-model="editCustomer.name"
                  :width="50"
              />
              <InputWithLabel
                  title="Last Name"
                  v-model="editCustomer.lastName"
                  :width="50"
              />
            </div>
            <div class="info-row">
              <InputWithLabel
                  title="Phone Number"
                  v-model="editCustomer.number"
                  :width="50"
              />
              <InputWithLabel
                  title="Birthday"
                  v-model="editCustomer.birthday"
                  :width="50"
              />
            </div>
            <div class="info-row">
              <InputWithLabel
                  title="City"
                  v-model="editCustomer.city"
                  :width="50"
              />
              <InputWithLabel
                  title="Family Members"
                  v-model="editCustomer.family"
                  :width="50"
              />
            </div>
            <div class="info-row">
              <InputWithLabel
                  title="Subscription"
                  v-model="editCustomer.subscription"
                  :width="50"
              />
            </div>
            <p><span>Orders:</span> {{editCustomer.orders.join(', ')}}</p>
          </div>
        </div>
      </template>
      <template
          #button>Save changes</template>
    </modal-window>

    <confirmation-delete
        v-if="confirmDelete"
        v-model="confirmDelete"
        @delete-product="deleteCustomer"
    />
  </div>
</template>

<script>
import ModalWindow from "@/components/ModalWindow";
import InputWithLabel from "@/components/helpers/InputWithLabel";
import ConfirmationDelete from "../helpers/ConfirmationDelete";

export default {
  name: "EditCustomer",
  components: {ConfirmationDelete, InputWithLabel, ModalWindow},
  data () {
    return {
      editCustomer: {
        name: '',
        lastName: '',
        number: '',
        birthday: '',
        city: '',
        family: '',
        subscription: '',
        orders: [],
      },
      confirmDelete: false
    }
  },
  computed: {
    getFullData () {
      let el = this.$store.getters.getFullData(this.customerID)
      return {
        id: el.id,
        name: el.firstName ?? '',
        lastName: el.lastName ?? '',
        number: el.phoneNumber ?? '',
        birthday: el?.birthDate ? new Intl.DateTimeFormat('en-GB').format(new Date(el.birthDate)) : '',
        city: el.cityName ?? '',
        family: String(el.familyMembersCount),
        lastOrder: el.ordersId?.length ? el.ordersId[0] : '',
        orders: el.ordersId ?? [],
        subscription: el.subscriptionIsActive ? 'yes' : ''
      }
    }
  },
  created() {
    this.editCustomer.name = this.getFullData
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    customerID: {
      type: String
    }
  },
  methods: {
    deleteCustomer () {
      this.$store.dispatch('deleteCustomer', this.getFullData.id)
      this.$emit('input', false)
    },
    async saveChanges () {
      let dataCustomer = this.$store.getters.getCustomer(this.getFullData.id)
      let [day, month, year]  = this.editCustomer.birthday.split("/")
      let data = {
        firstName: this.editCustomer.name ? this.editCustomer.name : null,
        lastName: this.editCustomer.lastName ? this.editCustomer.lastName : null,
        phoneNumber: this.editCustomer.number ? this.editCustomer.number : null,
        birthDate: new Date(Date.UTC(+year, month-1, +day)).toJSON(),
        familyMembersCount: this.editCustomer.family ? Number(this.editCustomer.family) : 0,
        nationality: dataCustomer.nationality,
        addressTranslations: [
          {
            "culture": "en",
            "cityName": this.editCustomer.city ? this.editCustomer.city : null,
            "districtName": dataCustomer.districtName,
            "street": dataCustomer.street,
            "building": dataCustomer.building,
            "apartment": dataCustomer.apartment
          }
        ]
      }
      await this.$store.dispatch('putCustomer', {data, id: this.getFullData.id})
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/variables";

.main-block{
  display: flex;
  flex-direction: column;
  width: 100%;
  @include fontPoppins(12px, 400, 20px);
  .select-category{
    position: relative;
    margin: 0 0 20px;
    select {
      border: 1px solid #E8E8E8;
      border-radius: 10px;
      padding: 10px;
      cursor: pointer;
    }
    p{
      //&:after{
      //  position: absolute;
      //  display: block;
      //  content: '';
      //  width: 17px;
      //  height: 17px;
      //  background: #005CB9 url('../../assets/icons/arrow.svg') no-repeat center;
      //  top: 30px;
      //  left: 279px;
      //  border-radius: 5px;
      //  cursor: pointer;
      //}
    }

  }
  .image-block{
    display: flex;
    margin-bottom: 30px;
  }
  .image{
    width: 150px;
    height: 100px;
    border: 1px dashed #E7E6E6;
    border-radius: 10px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  }
  .image-cropper {
    width: 150px;
    height: 100px;
    //background: yellow;
    border: 1px dashed #E7E6E6;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 500;
    color: #2F3741;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
  }
  .info {
    display: flex;
    flex-direction: column;
    p{
      margin-top: 10px;
      span {
        font-weight: 600;
        padding-right: 20px;
      }
    }

    &-row {
      margin-top: 10px;
      display: flex;
      &.descriptions{
        //justify-content: space-between;
      }
    }
  }
}
</style>
